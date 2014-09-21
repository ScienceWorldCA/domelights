import socket
import sys
import time
import random
import base64

""" Fading white chaser pattern """

HOST, PORT = "localhost", 9999
FIXTURES = 260

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

canvas = []
for i in range(0,FIXTURES*3):
	canvas.append(0)

fp = open( 'running', 'w' )
fp.write( '' )
fp.close()

running = True

while running:
	for fixture in range( 0, FIXTURES ):
		
		for i in range( 0, FIXTURES*3 ):
			if canvas[i] > 0:
				canvas[i] = canvas[i] - 1
	
        	r_pixel = (fixture*3)
        	g_pixel = r_pixel + 1
        	b_pixel = g_pixel + 1
        	canvas[r_pixel] = random.randint(0,255)
        	canvas[g_pixel] = random.randint(0,255)
        	canvas[b_pixel] = random.randint(0,255)
			
		data = ''
		for j in range(0,len(canvas)):
			data = data + chr(canvas[j]) ## Blue
	
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
