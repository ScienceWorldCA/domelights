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

for i in range(0,1024):
	###print "Sending:", r, g, b
	data = ''
	for j in range(0,FIXTURES):
		data = data + chr(random.randint(0,255)) ## Red
		data = data + chr(random.randint(0,255)) ## Green
		data = data + chr(random.randint(0,255)) ## Blue
	try:
		###print "Sending:",len(data)
		res = sock.sendall(data)
	except socket.error as msg:
		print "sock.sendall:",res,msg
	time.sleep(0.020)

sock.close()
