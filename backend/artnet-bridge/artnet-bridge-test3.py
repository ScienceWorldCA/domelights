import socket
import sys
import time
import random
import base64

HOST, PORT = "localhost", 9999
LEDS_SIZE = 260
MAX_LEDS = (LEDS_SIZE*3)

print "MAX_LEDS:",MAX_LEDS

###for i in range(0,1):
while True:
	###print "Sending:", r, g, b
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.connect((HOST, PORT))
	data = ''
	for j in range(0,LEDS_SIZE):
		data = data + chr(random.randint(0,255)) ## Red
		data = data + chr(random.randint(0,255)) ## Green
		data = data + chr(random.randint(0,255)) ## Blue
	try:
		print "Sending:",len(data)
		sock.sendall(data)
	except socket.error as msg:
		print msg
		sock.close()
	time.sleep(0.0625)
