import SocketServer
import time, os, random, datetime, sys
import socket
import struct
import glob
import argparse
import platform

SocketServer.ThreadingTCPServer.allow_reuse_address = True

DEBUG = False

LEDS_SIZE = 260
MAX_BYTES = (LEDS_SIZE*3)

HOST, PORT = '', 9999

### General socket
try:
	sock = socket.socket( socket.AF_INET, socket.SOCK_STREAM )
except socket.error as msg:
 	sock = None

# Create the server, binding to localhost on port 9999
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
try:
	sock.bind((HOST, PORT))
	try:
		sock.listen(5)
	except socket.error as msg:
		sock.close
		sock = None
except socket.error as msg:
	sock.close()
	sock = None

if not sock:
	print "ERROR: Invalid socket"
	sys.exit()

while sock:
	try:
		conn, addr = sock.accept()
	except socket.error as msg:
		sock.close()
		sock = None
		break

	logf = open( "logfile", "a" );
	
	while True:
		data = conn.recv( MAX_BYTES )
		if not data: break

		if len(data) >= MAX_BYTES:
			logf.write( ''.join(x.encode('hex') for x in data) )
			logf.write( "\n" )

	conn.close()
	logf.close()
