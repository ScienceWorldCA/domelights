## control script for VHS's wall display array of WS2801 36mm Square LEDs   

import time, os, random, requests
import datetime, socket
from vhsled_spi import *
from vhsled_text import *
from vhsled_colour import *
from vhsled_rain import *

#properties of our display
width = 26
height = 10
strings = ["  PEACE","  LOVE","  VHS!"," WE <3 U","  PLUR","  RAEV","  HEY","  HACK!","  YVR"," SPACE"]

canvas = []
for i in range(0,width):
	canvas.append([0]*height)

HOST, PORT = "localhost", 9999

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

random.seed()

## bpm/clock stuff
bpm = 174
interval = float( 250 / bpm )
###interval = ( ( interval / 1000 ) * 4)
###interval = 0.5
###interval = 0.250
interval = 0.125
###interval = 0.1
###interval = 0.062
###interval = float( 0.125 / 2 )
###interval = 1/3

## enableClock (or not)
enableClock = 1
showClock = enableClock
## enableWords
enableWords = 1

brightness = 0xCC

## Debug
verbose = 0

###r = requests.get( 'http://www.random.org/integers/?num=100&min=0&max=2&col=1&base=10&format=plain&rnd=new' )

## LED Clock settings
c = randomColor()
setFullColor(canvas,sock,c)

# a few nice and bright colours with at least one channel at full.
bright_colors = [Color(255,0,0),Color(0,255,0),Color(0,0,255),Color(255,255,0),Color(255,0,255),Color(0,255,255)]
background_colors = [Color(0,0,0),Color(255,0,0),Color(0,255,0),Color(0,0,255)]
text_colors = [Color(0,0,0),Color(255,0,0),Color(0,255,0),Color(0,0,255)]

while (not os.path.exists("./stop")):
	action = random.randint(0,2)
	loopmod = random.randint(1,4)
	###loopmod = 2
	if action == 0:
		loopinterval = interval
        elif action == 1:
		loopinterval = interval / loopmod
        elif action == 2:
		loopinterval = interval * loopmod

	if enableClock == 1:
		showClock = random.randint(0,1)

	randomMax = random.randint(0,7)

	colorSwitch = random.randint(0,randomMax)

	if colorSwitch == 0 and showClock == 1:
		if verbose:
			print "clock"
        	clockTextOnce(canvas,sock,characters,":",random.choice(background_colors),Color(0,0,0))
		time.sleep(loopinterval)
	elif colorSwitch == 0 and enableWords == 1:
		if verbose:
			print "word"
		displayTextOnce(canvas,sock,characters,random.choice(strings),random.choice(text_colors),random.choice(background_colors),(interval*2))
	elif colorSwitch == 1:
		fade = random.randint(0,2)
		if fade == 0:
			fadeInColor(canvas, sock,random.choice(bright_colors),loopinterval)
			fadeOutColor(canvas, sock,random.choice(bright_colors),loopinterval)
		elif fade == 1:
			fadeOutColor(canvas, sock,random.choice(bright_colors),loopinterval)
		elif fade == 2:
			fadeInColor(canvas, sock,random.choice(bright_colors),loopinterval)
	elif colorSwitch < randomMax:
		if verbose:
			print "flash"
		###colorFlashMode(canvas,sock,random.randint(0,20),loopinterval)
		colorFlashMode(canvas,sock,random.randint(0,1),loopinterval)
	elif colorSwitch == randomMax:
		if verbose:
			print "clear"
		setFullColor( canvas, sock, 0 )
		time.sleep( loopinterval )

sock.close()
if verbose:
	print "stopping led display"
