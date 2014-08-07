# a more accurate name for this would be timer.py, however the "spec"
#  calls for the pi based timer to be called piMC.py. Who am I to argue.
import RPi.GPIO as GPIO, time, os, random
import datetime
import math
from vhsled_spi import *
from vhsled_text import *
from vhsled_colour import *


def countdown_timer(pixels, c, time_s):
        setFullColor(pixels,spidev,c)
        for i in range (0,height):
                for j in range(0,width):
                        setpixelcolor(pixels,j,i,Color(0,0,0))
                        writestrip(pixels,spidev)
                        time.sleep(time_s/(width*height))

GPIO.setmode(GPIO.BCM)

width = 42
height = 10
strings = ["VHS ! VHS !", "Welcome to the Bunker","drink beer", "hack the planet", "42", "feed donatio", "go hack something", "the cake is a lie !"]
oddstrings  = ["subliminal message","They Live","fight the power","buy our stuff!"]

ledpixels = []
for i in range(0,width):
        ledpixels.append([0]*height)

spidev = file("/dev/spidev0.0", "w")

random.seed()

###c = randomColor()
setFullColor(ledpixels,spidev,Color(0,0,0))

# a few nice and bright colours with at least one channel at full. 
bright_colors = [Color(0,255,0),Color(0,0,255),Color(255,255,0),Color(255,0,255),Color(0,255,255)]

# clock interval
###clockInterval = 0.001
clockInterval = 0.1

stepinterval = 1
t2=0
maxd= math.sqrt( width*width + height*height );

def spiral(ledpixels,t):
	t*=16;
	for y in range(height):
		for x in range(width):
			x1 = x - (width/2)
			y1 = y - (height/2)
			if y1 == 0:
				d = 0
			else:
				d = x1/y1
			r = int( 128 + 127 * math.cos( t + d ) )
			g = int( 128 + 127 * math.cos( t + d ) )
			b = 255 - int( 128 + 127 * math.cos( t + d ) )
			setpixelcolor(ledpixels,x,y,Color(r,g,b))


def tunnel(ledpixels,t):
	t*=24;
	for y in range(height):
		for x in range(width):
			x1 = x - (width/2)
			y1 = y - (height/2)
			d = math.sqrt( (x1*x1) + (y1*y1) )
			d2 = math.cos( t + d )
			if d2 > 0:
				r = d2 * 255
				g = 255 - r
			else:
				g = -d2 * 255;
				r = 255 - g;
			b = 128 + 127 * d2

			###print "red: %s" % int (r)
			###print "green: %s" % int(g)
			###print "blue: %s" % int(b)

			###r = int( 128 + 127 * math.cos( t + d ) )
			###g = int( 128 + 127 * math.cos( t + d ) )
			###b = int( 128 + 127 * math.cos( t + d ) )
			setpixelcolor(ledpixels,x,y,Color(int(r),int(g),int(b)))

def wave(ledpixels,t):
	setFullColor(ledpixels,spidev,Color(0,0,0))
	t = t * width
	for x in range(width):

		###h = (random.randint(1,height)%5)*2
		h = random.randint(0,(height-1))

		y = h

		for y in range(h):

			###r = int( 128 + 127 * math.cos( (math.pi * 4 * ((y1%4)/height) ) + t ) )
			###r = int( 128 + 127 * math.sin( t%4 + y%3 - x%3 ) )
			###r = 0 #int( 128 + 127 * math.sin( t - x ) )
			###r = int( 128 + 127 * math.sin( t + x*1.5 ) )
			###g = int( 128 + 127 * math.sin( t - x ) )
			###b = int( 128 + 127 * math.sin( t + x*3 ) )
			r = (int( 128 + 127 * math.sin( t + x*1.5 ) )%16)*16
			g = (int( 128 + 127 * math.sin( t - x ) )%16)*16
			b = (int( 128 + 127 * math.sin( t - x*3 ) )%16)*16
			###g = 0 #int( 128 + 127 * math.cos( t + x%3 ) )
			###b = 0 #int( 128 + 127 * math.cos( t + x1 ) )
	
			if r >= 240 or r == 0:
				setpixelcolor(ledpixels,x,y,Color(r,g,b))
			if g >= 240 or g == 0:
				setpixelcolor(ledpixels,x,y,Color(r,g,b))
			if b >= 240 or b == 0:
				setpixelcolor(ledpixels,x,y,Color(r,g,b))


while True:
	t2 = t2 + clockInterval;
	###tunnel(ledpixels,t2)
	wave(ledpixels,t2)
	#spiral(ledpixels,t2)
	writestrip(ledpixels,spidev)

	randaction = random.randint(1,255)

	if randaction == 255:
		fadeOutColor(ledpixels, spidev,Color(255,255,255),2)

	randdelay = float(1/random.randint(2,8))
	randdelay = 0.250
	time.sleep(randdelay)
