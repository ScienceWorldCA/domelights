import socket
import sys
import time
import random
import base64

HOST, PORT = "localhost", 9999
FIXTURES = 260

print "FIXTURES:",FIXTURES

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

switch = 0

for d in range( 1, 9 ):
	delay = 2 ** d
	print "Delay:", delay

	for i in range(0,delay):

		for k in range(0,2):

			if switch == 0:
				switch = 255
			else:
				switch = 0
	
			data = ''
			for j in range(0,FIXTURES):
				data = data + chr(switch) ## Red
				data = data + chr(switch) ## Green
				data = data + chr(switch) ## Blue
	
			try:
				sock.send(data)
			except socket.error as msg:
				print msg
				break
			time.sleep(1/delay)
	time.sleep(1)
sock.close()
