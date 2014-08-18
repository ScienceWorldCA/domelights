import json, requests, time, hmac, hashlib, math, socket, os
from subprocess import Popen, PIPE
import subprocess
import socket
import sys
import time
import random
import base64

class DomeAPI:
    """DomeLights API class"""

    def __init__(self,host,port,master_url,controller_name,controller_key):
        """ Initialize """
        import socket
        self._master_url = master_url
        self._controller_name = controller_name
        self._controller_key = controller_key
        self._authenticated = False
        self._active = False
        Debug( "Connecting to: " + host + ":" + str( port ) )
        self._sock = None
        try:
            self._sock = socket.socket( socket.AF_INET, socket.SOCK_STREAM )
        except socket.error as msg:
            print "Error creating socket:",msg
        try:
            self._sock.connect( (host,port) )
        except socket.error as msg:
            print "Error connecting socket:",msg
        self._httpClient = requests.Session()
        self._running = True

    def __del__(self):
        """ Clean up """
        Debug( "Closing socket" )
        self._sock.close()
        
    def sendData(self,data):
            try:
                self._sock.send( data )
            except socket.error as msg:
                print msg
            time.sleep(0.0225)
        
    def api_call(self, remote_method, data):
        message_hash = self._controller_name + str(int(time.time())) + self._controller_key

        data['controller_name'] = self._controller_name
        data['timestamp'] = int(time.time())
        data['hash'] = hmac.new( self._controller_key, message_hash, hashlib.sha256).hexdigest()

        request_url = self._master_url + remote_method

        s = self._httpClient
        r = s.post(request_url, data)
       
        Debug( str( r.text ) )

#         Debug( r )
                
        return r.json()
    
class DomeController(DomeAPI):
    """DomeLights Controller class"""

    def __init__(self,host,port,master_url,controller_name,controller_key):
        """ Initialize """
        DomeAPI.__init__(self, host, port, master_url, controller_name, controller_key)
        self._state = None
        self._runningFile = None
        self._subprocess = None
        
        if not self._runningFile:
            self._runningFile = open( 'running', 'w' )

    def __del__(self):
        """ Clean up """
        DomeAPI.__del__(self)
        
    def getControllerState(self):
        data = {}
        request_result = self.api_call('GetControllerState', data)
        
        return request_result['mode']
        
    def getScheduledAnimationScript(self):
        data = {}
        request_result = self.api_call('GetScheduledAnimationScript', data)
        
        return request_result['script_name']
    
    def stopRunning(self):
        if not self._subprocess:
            return
        
        Debug( "Signalling STOP" )
        self._runningFile = open( 'running', 'w' )
        self._runningFile.write( "STOP" )
        self._runningFile.close()

        Debug( "Waiting for subprocess to stop..." )
        if self._subprocess != None:
            self._subprocess.communicate( "STOP" )
            self._subprocess = None
        Debug( "Killed!" )
    
    def run(self):
        while True:
            Debug( "Loop..." )

            controller_state = self.getControllerState()
            
            Debug( "Controller State: " + str( controller_state ) )
            
            if self._state != None and controller_state != self._state:
                Debug( "Changing states from " + self._state + " to " + controller_state )
                self.stopRunning()
                
            self._state = controller_state
            
            sleep = 15

            Debug( "Subprocess: " + str( self._subprocess ) )
            
            if controller_state == "0":
                Debug("Player is set down, sleeping for 60 seconds")
                sleep = 15
            elif controller_state == "1":
                if self._subprocess != None and self._subprocess.poll() == None:
                   Debug( "Animation player already running" )
                else:
                    Debug( "Animation player not running" )
                    Debug( "Spawning animation player" )
                    self._subprocess = None
                    self._subprocess = subprocess.Popen( [ "/usr/bin/python", "domeplayer.py" ], stdout=PIPE, stdin=PIPE, stderr=PIPE )
                sleep = 15
            else:
                ## Run script
                if self._subprocess != None and self._subprocess.poll() == None:
                    Debug( "Scripted animation already running" )
                else:
                    Debug( "Scripted animation not running" )
                    script_name = self.getScheduledAnimationScript()
                    Debug( "Spawning scripted animation: " + script_name )
                    self._subprocess = None
                    self._subprocess = subprocess.Popen( [ "/usr/bin/python", "scripts/" + script_name ], stdout=PIPE, stdin=PIPE, stderr=PIPE )
                sleep = 15
            
            for per in range(0,sleep):
                Debug( "Sleeping [" + str(sleep - per) + "]..." )
                time.sleep(1)

class DomePlayer(DomeAPI):
    """DomeLights Controller class"""

    def __init__(self,host,port,master_url,controller_name,controller_key):
        """ Initialize """
        DomeAPI.__init__(self, host, port, master_url, controller_name, controller_key)
        # Reset running file
        fp = open( 'running', 'w' )
        fp.write( "" )
        fp.close()
        # Set shows list
        self._shows = []

    def __del__(self):
        """ Clean up """
        DomeAPI.__del__(self)
        
    def isPlaying(self):
        data = {}
        request_result = self.api_call('GetControllerState', data)
        
        Debug( str( request_result ) )

        if request_result['mode'] == "1":
            self._running = True
        else:
            self._running = False
            
        return self._running
    
    def getNextShow(self):
        data = {}
        request_result = self.api_call('GetNextShow', data)
         
        Debug( str( request_result ) )
      
        if request_result['hasNewShow'] == True:
            Debug( "Adding show" )
            self._shows.append( request_result )
            return True
        else:
            Debug( "No show to add" )
            return False
        
    def playShow(self):
        if len(self._shows) == 0: Debug( "No available shows to play!" )

    def run(self):
        while self.canRun():
            Debug( "Running" )
            if self.isPlaying():
                Debug("Player is set up")
                Debug("Checking for new shows")
                self.playShow()
                if not self.getNextShow():
                    sleep = 15
            else:
                Debug("Player is set down, sleeping for 60 seconds")
                sleep = 60
                
            for per in range(0,sleep):
                Debug( "Sleeping [" + str(sleep - per) + "]..." )
                time.sleep(1)
                
    def canRun(self):
        Debug( "Check if we're still allowed to be running" )
        if not self._running:
            return False
        
        Debug( "Check the running file" )
        fp = open( 'running', 'r' )
        inp = fp.read().strip()
        Debug( "FP/inp: " + str( inp ) )
        if inp == "STOP":
            self._running = False
        fp.close()
        
        return self._running
    
    def play(self,filename):
        f = open(filename, "rb")
        try:
            data = f.read(780)
            self.sendData( data )
            while data != "":
                # Do stuff with byte.
                data = f.read(780)
                self.sendData( data )
        finally:
            f.close()

def Debug( message ):
    if Debug: print message
