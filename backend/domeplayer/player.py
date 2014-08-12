import json, requests, time, hmac, hashlib, math, socket
import socket
import sys
import time
import random
import base64

DEBUG = True

MASTER_URL = 'http://localhost/player_api/'

PLAYER_NAME = 'artnet-domeplayer01'
PLAYER_KEY = 'Qm9nZF0ouU7A'

BRIDGE_IP, BRIDGE_PORT = '127.0.0.1', 9999

class DomePlayer:
	"""DomeLights Player class"""

	def __init__(self,host,port):
		""" Initialize """
		import socket
		self._authenticated = False
		self._active = False
		self._shows = []
		Debug( "Connecting to:"+host+str(port) )
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
		self.isPlaying()

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
		message_hash = PLAYER_NAME + str(int(time.time())) + PLAYER_KEY

		data['player_name'] = PLAYER_NAME
		data['timestamp'] = int(time.time())
		data['hash'] = hmac.new( PLAYER_KEY, message_hash, hashlib.sha256).hexdigest()

		request_url = MASTER_URL + remote_method

		s = self._httpClient
		r = s.post(request_url, data)
		
		Debug( r.text )
		
		return r.json()
	
	def isPlaying(self):
		data = {}
		request_result = self.api_call('GetPlayerState', data)

		self._active = request_result['active']
		return self._active
	
	def getNextShow(self):
		data = {}
		request_result = self.api_call('getNextShow', data)
		
		if request_result['hasNewShow'] == True:
			Debug( "Adding show" )
			self._shows.append( request_result )
		else:
			Debug( "No show to add" )
		
	def playShow(self):
		if len(self._shows) == 0: Debug( "No available shows to play!" )
		
	def run(self):
		while True:
			if player.isPlaying():
				Debug("Player is set up")
				Debug("Checking for new shows")
				player.playShow()
				player.getNextShow()
				Debug("Sleeping...")
				time.sleep(1)
			else:
				Debug("Player is set down, sleeping for 60 seconds")
				time.sleep(60)


def Debug( message ):
	if Debug: print message

player = DomePlayer(BRIDGE_IP, BRIDGE_PORT)
player.run()