import socket
import sys
import time
import random
import base64

""" Slow chaser """

HOST, PORT = "localhost", 9999
FIXTURES = 260

print "FIXTURES:",FIXTURES

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

while True:
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
		time.sleep(1)

sock.close()
