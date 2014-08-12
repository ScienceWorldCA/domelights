import socket
import sys
import time
import random
import base64

""" Fading white chaser pattern """

HOST, PORT = "localhost", 9999
FIXTURES = 260

print "FIXTURES:",FIXTURES

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

canvas = []
for i in range(0,FIXTURES):
	canvas.append(0)

while True:
	for fixture in range( 0, FIXTURES ):
		
		for i in range(0,FIXTURES):
			if canvas[i] > 0:
				canvas[i] = canvas[i] - 1
	
		canvas[fixture] = 255
			
		data = ''
		for j in range(0,FIXTURES):
			data = data + chr(canvas[j]) ## Red
			data = data + chr(canvas[j]) ## Green
			data = data + chr(canvas[j]) ## Blue
	
		try:
			sock.send(data)
		except socket.error as msg:
			print msg
			break
		time.sleep(0.0225)

sock.close()
