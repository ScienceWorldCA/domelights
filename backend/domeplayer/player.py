import json, requests, time

MASTER_URL = 'http://localhost/player_api/'
BRIDGE_IP = '127.0.0.1'
BRIDGE_PORT = '9999'

class DomePlayer:
	"""DomeLights Player class"""

	def __init__(self):
		self.active = False
		self.isPlaying()

	def api_call( self, remote_method, data ):
		request_url = MASTER_URL+remote_method
		r = requests.post( request_url, data )
	
		return json.load( r.json )

	def isPlaying(self):
		data = []
		request_result = self.api_call( 'GetPlayerState', data )
		self.active = request_result.active
		return self.active

player = DomePlayer()

while player.isPlaying():
	print "Player is up"
	time.sleep(1)
