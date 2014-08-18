import socket
import sys
import time
import random
import base64

""" Gradient pattern """

HOST, PORT = "localhost", 9999
FIXTURES = 8

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

canvas = []
for i in range(0,FIXTURES):
	canvas.append(0)

fp = open( 'running', 'w' )
fp.write( '' )
fp.close()

black = ''
for i in range(0,FIXTURES):
	black = black + chr(0)
	black = black + chr(0)
	black = black + chr(0)

running = True

r = random.randint(0,255)
g = random.randint(0,255)
b = random.randint(0,255)

dest_r = random.randint(0,255)
dest_g = random.randint(0,255)
dest_b = random.randint(0,255)

if dest_r > r:
	r_delta = 1
else:
	r_delta = -1

if dest_g > g:
	g_delta = 1
else:
	g_delta = -1

if dest_b > b:
	b_delta = 1
else:
	b_delta = -1

while running:

	if (r+r_delta) == dest_r or r == 0 or r == 255:
		dest_r = random.randint(0,255)
		if dest_r >= r:
			r_delta = 1
		else:
			r_delta = -1
	r = r+r_delta

	if (g+g_delta) == dest_g or g == 0 or g == 255:
		dest_g = random.randint(0,255)
		if dest_g > g:
			g_delta = 1
		else:
			g_delta = -1
	g = g+g_delta

	if (b+b_delta) == dest_b or b == 0 or b == 255:
		dest_b = random.randint(0,255)
		if dest_b > b:
			b_delta = 1
		else:
			b_delta = -1
	b = b+b_delta

# 	print r,g,b

	# Write data
	data = ''
	for fixture in range( 0, FIXTURES ):
		data = data + chr(r) ## Red
		data = data + chr(g) ## Green
		data = data + chr(b) ## Blue

	# Send data
	try:
		sock.send(data)
	except socket.error as msg:
		print msg
		break
	
	# Mandatory sleep
	time.sleep(0.0225)

	## Check if we can still run
	fp = open( 'running', 'r' )
	inp = fp.read().strip()
	if inp == "STOP":
		running = False
	fp.close()

# Close socket
sock.close()
