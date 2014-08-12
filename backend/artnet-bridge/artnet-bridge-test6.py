import socket
import sys
import time
import random
import base64

""" FPS test """

HOST, PORT = "localhost", 9999
FIXTURES = 260

print "FIXTURES:",FIXTURES

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

for delay in range( 1, 200 ):
	print float(1000/delay)

	for k in range(0,(delay*3)):

		data = ''
		for j in range(0,FIXTURES):
			data = data + chr(random.randint(0,255)) ## Red
			data = data + chr(random.randint(0,255)) ## Green
			data = data + chr(random.randint(0,255)) ## Blue

		try:
			sock.send(data)
		except socket.error as msg:
			print msg
			break
	time.sleep(1/delay)
sock.close()
