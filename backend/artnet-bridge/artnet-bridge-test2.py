import socket
import sys
import time
import random

HOST, PORT = "localhost", 9999
###HOST, PORT = "172.16.0.91", 9999

FIXTURES=260

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

for i in range(0,1024):
	data = ''
	for j in range(0,FIXTURES):
		data = data + chr(random.randint(0,255)) ## Red
		data = data + chr(random.randint(0,255)) ## Green
		data = data + chr(random.randint(0,255)) ## Blue
	try:
		sock.sendall(data)
	except socket.error as msg:
		print msg
		break
	time.sleep(0.005)
sock.close()
