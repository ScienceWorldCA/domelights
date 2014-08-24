import socket
import sys
import time
import random
import base64

""" Send a single blacked out screen update """

HOST, PORT = "localhost", 9999
FIXTURES = 260

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

canvas = []
for i in range(0,FIXTURES):
	canvas.append(0)


black = ''
for i in range(0,FIXTURES):
	black = black + chr(0)
	black = black + chr(0)
	black = black + chr(0)
	
fp = open( 'running', 'w' )
fp.write( '' )
fp.close()

try:
	sock.send(black)
except socket.error as msg:
	print msg

sock.close()
