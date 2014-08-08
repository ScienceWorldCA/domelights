import json, requests, time, hashlib

DEBUG = True

MASTER_URL = 'http://localhost/player_api/'

PLAYER_NAME = 'artnet-domeplayer01'
PLAYER_KEY = 'Qm9nZF0ouU7A'

BRIDGE_IP = '127.0.0.1'
BRIDGE_PORT = '9999'

class DomePlayer:
	"""DomeLights Player class"""

	def __init__(self):
		self.active = False
		self.isPlaying()

	def api_call(self, remote_method, data):
		message_hash = PLAYER_NAME + str(time.time())

		data['player_name'] = PLAYER_NAME
		data['timestamp'] = time.time()
		data['hash'] = hashlib.sha256(message_hash.encode()).hexdigest()

		request_url = MASTER_URL + remote_method

		r = requests.post(request_url, data)
	
		return r.json()

	def isPlaying(self):
		data = {}
		request_result = self.api_call('GetPlayerState', data)

		self.active = request_result['active']
		return self.active

def Debug(message):
	if Debug: print message

player = DomePlayer()

print player.isPlaying()
while True:
	if player.isPlaying():
		Debug("Player is up")
		time.sleep(1)
	else:
		Debug("Player is not up")
		time.sleep(60)
