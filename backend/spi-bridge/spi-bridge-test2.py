import socket
import sys
import time
import random

HOST, PORT = "localhost", 9999

for i in range(0,1024):
	###print "Sending:", r, g, b
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.connect((HOST, PORT))
	data = ''
	###for j in range(0,8):
	for j in range(0,19):
		data = data + chr(random.randint(0,255)) ## Blue
		data = data + chr(random.randint(0,255)) ## Red
		data = data + chr(random.randint(0,255)) ## Green
	try:
		sock.sendall(data+"\n")
	except socket.error as msg:
		print msg
		sock.close()
	time.sleep(0.0625)
