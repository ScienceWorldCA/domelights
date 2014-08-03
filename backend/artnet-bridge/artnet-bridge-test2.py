import socket
import sys
import time
import random

HOST, PORT = "localhost", 9999
###HOST, PORT = "172.16.0.91", 9999

FIXTURES=260

###for i in range(0,1024):
while True:
	###print "Sending:", r, g, b
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.connect((HOST, PORT))
	data = ''
	for j in range(0,FIXTURES):
		data = data + chr(random.randint(0,255)) ## Red
		data = data + chr(random.randint(0,255)) ## Green
		data = data + chr(random.randint(0,255)) ## Blue
	try:
		sock.sendall(data)
	except socket.error as msg:
		print msg
		sock.close()
	###time.sleep(0.005)
	time.sleep(0.005)
