import json, requests, time, hmac, hashlib, math, socket, platform
import socket
import sys
import time
import random
import base64
# from domelights import *

DEBUG = True

MASTER_URL = 'http://localhost/dome_api/'

PLAYER_NAME = 'domeplayer01'
PLAYER_KEY = 'Qm9nZF0ouU7A'

BRIDGE_IP, BRIDGE_PORT = '127.0.0.1', 9999

if platform.system() == "Windows":
	PYTHON_PATH = "D:\Python27\Python.exe"
else:
	PYTHON_PATH = "/usr/bin/python"

def Debug( message ):
	if Debug: print message

log = open( 'domeplayer.log', 'a' )

if len( sys.argv ) == 2:
	log.write( "Got file\n" )
	data_file = sys.argv[1]

	log.write( "Connecting to: " + BRIDGE_IP + ":" + str(BRIDGE_PORT) )
	
	_sock = None
	
	try:
		_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	except socket.error as msg:
		print "Error creating socket:", msg

	try:
	    _sock.connect( (BRIDGE_IP, BRIDGE_PORT) )
	except socket.error as msg:
	    print "Error connecting socket:", msg
	  
	log.write( "Playing data_file\n" )
	
	f = open( data_file, "rb" )

	data = f.read(780)
    
	_sock.send(data)
        
	while data != "":
		time.sleep(0.0225)
		# Do stuff with data.
		data = f.read(780)
		_sock.send(data)
	
	f.close()
	
	""" Clean up """
	Debug("Closing socket")
	_sock.close()

else:
	log.write( "Missing file\n" )

log.close()