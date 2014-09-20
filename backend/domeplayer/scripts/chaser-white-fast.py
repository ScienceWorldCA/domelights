import socket
import sys
import time
import random
import base64

""" Fast chaser pattern test """

HOST, PORT = "localhost", 9999
FIXTURES = 260

print "FIXTURES:",FIXTURES

fp = open( 'running', 'w' )
fp.write( '' )
fp.close()

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

running = True

while running:
	for light in range( 0, FIXTURES ):
		data = ''
		for j in range(0,light):
			data = data + chr(0) ## Red
			data = data + chr(0) ## Green
			data = data + chr(0) ## Blue
	
		data = data + chr(255) ## Red
		data = data + chr(255) ## Green
		data = data + chr(255) ## Blue
	
		for j in range(light,FIXTURES):
			data = data + chr(0) ## Red
			data = data + chr(0) ## Green
			data = data + chr(0) ## Blue
	
		try:
			sock.send(data)
		except socket.error as msg:
			print msg
			break
		time.sleep(0.0225)

	## Check if we can still run
	fp = open( 'running', 'r' )
	inp = fp.read().strip()
	if inp == "STOP":
		running = False
	fp.close()

# Close socket
sock.close()
