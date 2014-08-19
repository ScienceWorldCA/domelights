import socket
import sys
import time
import random
import base64

""" White twinkle star pattern """

HOST, PORT = "localhost", 9999
FIXTURES = 260
CHANNELS = (FIXTURES*3)

canvas = []

for c in range(0,CHANNELS):
	canvas.append( 0 )

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

fp = open( 'running', 'w' )
fp.write( '' )
fp.close()

running = True

while running:
	# Fade out
	for c in range(0,CHANNELS):
		if canvas[c] > 0:
			canvas[c] = canvas[c] - 1

	if random.randint(0,5) == 5:
		for i in range(0,random.randint(3,7)):
			random_pixel = random.randint( 1, (FIXTURES-1) )
		
			r_pixel = (random_pixel*3)
			g_pixel = r_pixel + 1
			b_pixel = g_pixel + 1
			canvas[r_pixel] = 255
			canvas[g_pixel] = 255
			canvas[b_pixel] = 255

	data = ''
	for c in range(0,CHANNELS):
		data = data + chr(canvas[c])

	try:
		sock.send(data)
	except socket.error as msg:
		print msg
		break
	time.sleep(0.0225)

	## Check if we're still running
	fp = open( 'running', 'r' )
	inp = fp.read().strip()
	if inp == "STOP":
		running = False
	fp.close()

sock.close()
