import json, requests, time, hmac, hashlib, math, socket, os
from subprocess import Popen, PIPE
import subprocess
import socket
import sys
import time
import random
import base64

class DomeController:
    """DomeLights Controller class"""

    def __init__(self, master_url, controller_name, controller_key):
        """ Initialize """
        import socket
        self._master_url = master_url
        self._controller_name = controller_name
        self._controller_key = controller_key
        self._authenticated = False
        self._active = False
        self._httpClient = requests.Session()
        self._running = True
        self._state = None
        self._runningFile = None
        self._subprocess = None
        self._script_name = None
        
    def api_call(self, remote_method, data):
        message_hash = self._controller_name + str(int(time.time())) + self._controller_key

        data['controller_name'] = self._controller_name
        data['timestamp'] = int(time.time())
        data['hash'] = hmac.new(self._controller_key, message_hash, hashlib.sha256).hexdigest()

        request_url = self._master_url + remote_method

        s = self._httpClient
        r = s.post(request_url, data)
       
        Debug(str(r.text))

        return r.json()

    def getControllerState(self):
        data = {}
        request_result = self.api_call('GetControllerState', data)
        
        return request_result['mode']
        
    def getScheduledAnimationScript(self):
        data = {}
        request_result = self.api_call('GetScheduledAnimationScript', data)
        
        return request_result['script_name']
        
    def getDefaultAnimationScript(self):
        data = {}
        request_result = self.api_call('GetDefaultAnimationScript', data)
        
        return request_result['script_name']
    
    def stopScript(self):
        if not self._subprocess:
            return
        
        Debug("Signalling STOP")
        self._runningFile = open('running', 'w')
        self._runningFile.write("STOP")
        self._runningFile.close()

        Debug("Waiting for subprocess to stop...")
        if self._subprocess != None:
            self._subprocess.communicate("STOP")
            self._subprocess = None
        Debug("Killed!")
        
    def getScheduledShow(self):
        data = {}
        request_result = self.api_call('GetScheduledShow', data)
        
        if not request_result['hasNewShow']:
            return False
        else:
            return request_result['data'] 
    
    def run(self):
        while True:
            Debug("Loop...")

            controller_state = self.getControllerState()
            
            Debug( "Controller State: " + str( controller_state ) )
            
            if self._state != None and controller_state != self._state:
                Debug( "Changing states from " + self._state + " to " + controller_state )
                self.stopScript()
                
            self._state = controller_state
            
            sleep = 15

            Debug("Subprocess: " + str(self._subprocess))
            
            if controller_state == "0":
                Debug("Player is set down, sleeping for 60 seconds")
                sleep = 15
                
            elif controller_state == "1":
                # Fetch next animation
                animation = self.getScheduledShow()
                
                # If we have a valid animation, send a stop signal and start playback
                if animation != False:
                    # Send stop
                    # Start animation
                    self._subprocess = None
                    self._subprocess = subprocess.Popen([ "/usr/bin/python", "scripts/domeplayer.py", "LightData_3Btyes40fps30seconds.dat" ], stdout=PIPE, stdin=PIPE, stderr=PIPE)
                    sleep = 1
                    
                elif self._subprocess != None and self._subprocess.poll() == None:
                   Debug("Animation player already running")
                else:
                    Debug("Animation player not running")
                    Debug("Spawning default script player")
                    
                    script_name = self.getDefaultAnimationScript()
                    
                    script_file = "scripts/" + script_name
                    Debug("Spawning scripted animation: " + script_file)
                    self._subprocess = None
                    self._subprocess = subprocess.Popen([ "/usr/bin/python", script_file ], stdout=PIPE, stdin=PIPE, stderr=PIPE)
                    sleep = 1
                    
            else:
                # Detect script change
                script_name = self.getScheduledAnimationScript()
                if self._script_name == None:
                    Debug( "First run for scripted animation" )
                elif self._script_name.strip() != script_name.strip():
                    Debug( "Scripted animation change, stopping current script" )
                    Debug( "Changed from " + str( self._script_name ) + " to " + script_name )
                    self.stopScript()
                
                self._script_name = script_name
                    
                if self._subprocess != None and self._subprocess.poll() == None:
                    Debug("Scripted animation already running")
                else:
                    Debug("Scripted animation not running")
                    script_file = "scripts/" + script_name
                    Debug("Spawning scripted animation: " + script_file)
                    self._subprocess = None
                    self._subprocess = subprocess.Popen([ "/usr/bin/python", script_file ], stdout=PIPE, stdin=PIPE, stderr=PIPE)
                sleep = 15
            
            for per in range(0, sleep):
                Debug("Sleeping [" + str(sleep - per) + "]...")
                time.sleep(1)

def Debug(message):
    if Debug: print message
