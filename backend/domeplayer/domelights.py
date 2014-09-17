import json, requests, time, hmac, hashlib, math, socket, os, datetime
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

		Debug("Sending STOP signal to residual processes")
		self._runningFile = open('running', 'w')
		self._runningFile.write("STOP")
		self._runningFile.close()
		time.sleep(5)
		Debug("Clearing STOP signal")
		self._runningFile = open('running', 'w')
		self._runningFile.write("")
		self._runningFile.close()
		
	def api_call(self, remote_method, data):
		message_hash = self._controller_name + str(int(time.time())) + self._controller_key

		data['controller_name'] = self._controller_name
		data['timestamp'] = int(time.time())
		data['hash'] = hmac.new(self._controller_key, message_hash, hashlib.sha256).hexdigest()

		request_url = self._master_url + remote_method

		s = self._httpClient
		 
		try:
			r = s.post(request_url, data)
		except requests.exceptions.ConnectionError as e:
			r = s.post(request_url, data)
			pass
	   
		Debug('api_call:'+str(r.text))

		return r.json()

	def GetControllerState(self):
		data = {}
		request_result = self.api_call('GetControllerState', data)
		
		self._fallback_script_name = request_result['script_name']
		
		return request_result['mode']
		
	def GetControllerTask(self):
		data = {}
		request_result = self.api_call('GetControllerTask', data)
                
		return request_result
		
	def SetAnimationPlayed(self, animation_id ):
		data = {}
		data['animation_id'] = animation_id
		request_result = self.api_call('SetAnimationPlayed', data)
                
		return request_result
		
	def stopScript(self):
		if not self._subprocess:
			return
		
		Debug("Signalling STOP")
		self._runningFile = open('running', 'w')
		self._runningFile.write("STOP")
		self._runningFile.close()

		Debug("Waiting for subprocess to stop...")
		self._subprocess.wait()
		Debug("Killed!")
		
		# Send black screen update
		self.sendBlackScreen()
		
		# Reset subprocess handle
		self._subprocess = None
		
	def sendBlackScreen(self):
		self.runScript( 'blackscreen.py' )
		
	def run(self):
		while True:
			Debug("Loop...")
			

			controller_state = self.GetControllerState()
			
			Debug( "Controller State: " + str( controller_state ) )
			
			if self._state != None and controller_state != self._state:
				Debug( "Changing states from " + self._state + " to " + controller_state )
				self.stopScript()
				
			self._state = controller_state
			
			sleep = 1

			Debug("Subprocess: " + str(self._subprocess))
			
			if controller_state == '0':
				Debug("Player is set down, sleeping for 60 seconds")
				sleep = 60
				
			elif controller_state == '1':
				# Fetch next animation
				task_info = self.GetControllerTask()

				if task_info['mode'] == '0':
					Debug( "Scheduled down time, sleeping for 60 seconds" )
					sleep = 60
				elif task_info['mode'] == '1':
        				script_name = task_info['script_name']
        				
        				# If we have a valid animation, send a stop signal and start playback
        				if script_name == 'domeplayer.py':
        					self._script_name = script_name					
        					if self._subprocess != None and self._subprocess.poll() == None:
        						Debug("Animation player already running")
        						# Send stop
        						self.stopScript()
        					
        					try:	
        						fp = open( 'LightData.dat', 'w' )
        						fp.write( base64.b64decode( task_info['data'] ) )
        						fp.close()
        					finally:
        						# Run animation
        						self.runAnimation()
        						# Set animation as played
        						self.SetAnimationPlayed( task_info['id'] )
        						
        						Debug( "Done!" )
        				
        				elif self._script_name != script_name:
        					# Send stop
        					self.stopScript()
        					
        					Debug("Spawning script player")
        
        					self.runScript( script_name )
        					sleep = 5
        					
        				elif self._subprocess != None and self._subprocess.poll() == None:
        				   Debug("Animation player already running")
        				   sleep = 5
        				   
        				else:
        					Debug("Animation player not running")
        					Debug("Spawning script player")
        
        					self.runScript( script_name )
        					sleep = 5
					
			elif controller_state == "2":
				if self._script_name != self._fallback_script_name:
					# Send stop
					self.stopScript()
					
					Debug("Spawning script player")

					self.runScript( self._fallback_script_name )
					sleep = 5
					
				elif self._subprocess != None and self._subprocess.poll() == None:
				   Debug("Animation player already running")
				   sleep = 5
				   
				else:
					Debug("Animation player not running")
					Debug("Spawning script player")

					self.runScript( self._fallback_script_name )
					
					sleep = 5
			
			Debug( "Sleeping[" + str(sleep) + "]..." )
			for per in range(0, sleep):
#				 Debug("Sleeping [" + str(sleep - per) + "]...")
				time.sleep(1)

	def runAnimation(self):
		 Debug( "Playing animation" )
		 self._subprocess = None
		# Start animation
		 self._subprocess = subprocess.Popen([ "/usr/bin/python", "scripts/domeplayer.py", "LightData.dat" ], stdout=PIPE, stdin=PIPE, stderr=PIPE)
		 # Wait for animation to be done playing
		 self._subprocess.wait()

	def runScript(self,script_name):
		self._script_name = script_name					
		script_file = "scripts/" + script_name
		Debug("Spawning scripted animation: " + script_file)
		self._subprocess = None
		self._subprocess = subprocess.Popen([ "/usr/bin/python", script_file ], stdout=PIPE, stdin=PIPE, stderr=PIPE)

def Debug(message):
	if Debug: print datetime.datetime.now(), message
