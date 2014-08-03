import socket
import sys
import time
import random
import base64

HOST, PORT = "localhost", 9999
FIXTURES = 260

print "FIXTURES:",FIXTURES

for light in range( 0, FIXTURES ):
	###print "Sending:", r, g, b
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.connect((HOST, PORT))
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
		###print "Sending:",len(data)
		sock.send(data)
	except socket.error as msg:
		print msg
		sock.close()
	time.sleep(1)
