import json, requests, time, hmac, hashlib, math, socket
import socket
import sys
import time
import random
import base64
from domelights import *

DEBUG = True

MASTER_URL = 'http://localhost/dome_api/'

PLAYER_NAME = 'domeplayer01'
PLAYER_KEY = 'Qm9nZF0ouU7A'

BRIDGE_IP, BRIDGE_PORT = '127.0.0.1', 9999

PYTHON_PATH = "/usr/bin/python"

def Debug( message ):
	if Debug: print message


if len( sys.argv ) == 2:
	Debug( "Got file" )
	data_file = sys.argv[1]

	player = DomePlayer( BRIDGE_IP, BRIDGE_PORT, MASTER_URL, PLAYER_NAME, PLAYER_KEY )
	player.play( data_file )
else:
	print "Missing file"
