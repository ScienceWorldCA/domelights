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

colors = [
	{"r":255,"g":0,"b":0}, ## "red"
	{"r":255,"g":0,"b":0}, ## "green"
	{"r":255,"g":0,"b":0}, ## "blue"
	{"r":255,"g":69,"b":0}, ## "orange"
	{"r":255,"g":255,"b":0}, ## "yellow"
	{"r":0,"g":255,"b":255}, ## "cyan"
	{"r":64,"g":224,"b":208}, ## "turquoise"
	{"r":255,"g":215,"b":0}, ## "gold"
	{"r":255,"g":20,"b":147} ## "pink"
]

canvas = []
for i in range(0,FIXTURES*3):
	canvas.append(0)

fp = open( 'running', 'w' )
fp.write( '' )
fp.close()

running = True

while running:
	color = random.choice(colors)
	r = color["r"]
	g = color["g"]
	b = color["b"]
	
	for fixture in range( 0, FIXTURES ):
		
		for i in range( 0, FIXTURES*3 ):
			if i % 3 != 2:
				canvas[i] = 0
			if canvas[i] > 0:
				canvas[i] = canvas[i] - 1
	
        	r_pixel = (fixture*3)
        	g_pixel = r_pixel + 1
        	b_pixel = g_pixel + 1
        	canvas[r_pixel] = r ### random.randint(0,255)
        	canvas[g_pixel] = g ### random.randint(0,255)
        	canvas[b_pixel] = b ### random.randint(0,255)
			
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
