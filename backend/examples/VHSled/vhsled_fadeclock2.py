# a more accurate name for this would be timer.py, however the "spec"
#  calls for the pi based timer to be called piMC.py. Who am I to argue.
import RPi.GPIO as GPIO, time, os, random
import datetime
from vhsled_spi import *
from vhsled_text import *
from vhsled_colour import *

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

debug = 0

###c = randomColor()
setFullColor(ledpixels,spidev,Color(0,0,0))

# a few nice and bright colours with at least one channel at full. 
bright_colors = [Color(0,255,0),Color(0,0,255),Color(255,255,0),Color(255,0,255),Color(0,255,255)]

# clock interval
clockInterval = 0.125

brightnessmod = 0.1

stepinterval = 8

red_color = random.randint(0,255)
green_color = random.randint(0,255)
blue_color = random.randint(0,255)

# modifiers
red_mod = random.randint(1,stepinterval)
green_mod = random.randint(1,stepinterval)
blue_mod = random.randint(1,stepinterval)

# shift modifiers
if random.randint(0,1) == 1:
	red_mod = 0 - random.randint(1,stepinterval)

if random.randint(0,1) == 1:
	green_mod = 0 - random.randint(1,stepinterval)

if random.randint(0,1) == 1:
	green_mod = 0 - random.randint(1,stepinterval)

while True:
	if debug == 1:
		print "===== Run ====="
		print "red_color: %s" % red_color
		print "green_color: %s" % green_color
		print "blue_color: %s" % blue_color
		print "red_mod: %s" % red_mod
		print "green_mod: %s" % green_mod
		print "blue_mod: %s" % blue_mod

	## Shift red
	if (red_color+red_mod) < 0:
		red_mod = random.randint(1,stepinterval)
	elif (red_color+red_mod) > 255:
		red_mod = 0 - random.randint(1,stepinterval)

	red_color = red_color + red_mod;

	## Shift green
	if (green_color+green_mod) < 0:
		green_mod = random.randint(1,stepinterval)
	elif (green_color+green_mod) > 255:
		green_mod = 0 - random.randint(1,stepinterval)

	green_color = green_color + green_mod;

	## Shift blue
	if (blue_color+blue_mod) < 0:
		blue_mod = random.randint(1,stepinterval)
	elif (blue_color+blue_mod) > 255:
		blue_mod = 0 - random.randint(1,stepinterval)

	blue_color = blue_color + blue_mod;

	###background_color = Color( int((255-red_color)*brightnessmod), int((255-green_color)*brightnessmod), int((255-blue_color)*brightnessmod) )
	background_color = Color( 0, 0, int((255-green_color)*brightnessmod) )

        clockTextOnce(ledpixels,spidev,characters,":",Color(red_color,green_color,blue_color),background_color)
        ###clockTextOnce(ledpixels,spidev,characters,":",Color(0,0,0),Color(red_color,green_color,blue_color))
	time.sleep(0.250)
	
        ###clockText(ledpixels,spidev,characters,":",Color(0,255,0),Color(0,0,0),0.01)
