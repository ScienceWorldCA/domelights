## control script for VHS's wall display array of WS2801 36mm Square LEDs   

import RPi.GPIO as GPIO, time, os, random, requests
import datetime
from vhsled_spi import *
from vhsled_text import *
from vhsled_colour import *
from vhsled_rain import *

GPIO.setmode(GPIO.BCM)

#properties of our display
width = 42
height = 10
strings = ["  PEACE","  LOVE","  VHS!"," WE <3 U","  PLUR","  RAEV","  HEY","  HACK!","  YVR"," SPACE"]

ledpixels = []
for i in range(0,width):
	ledpixels.append([0]*height)

spidev = file("/dev/spidev0.0", "w")        		
random.seed()

## bpm/clock stuff
bpm = 174
interval = float( 250 / bpm )
###interval = ( ( interval / 1000 ) * 4)
interval = 0.125

## enableClock (or not)
enableClock = 1
showClock = enableClock
## enableWords
enableWords = 1

brightness = 0xCC

## Debug
verbose = 1

###r = requests.get( 'http://www.random.org/integers/?num=100&min=0&max=2&col=1&base=10&format=plain&rnd=new' )

## LED Clock settings
c = randomColor()
setFullColor(ledpixels,spidev,c)

# a few nice and bright colours with at least one channel at full.
bright_colors = [Color(255,0,0),Color(0,255,0),Color(0,0,255),Color(255,255,0),Color(255,0,255),Color(0,255,255)]
background_colors = [Color(0,0,0),Color(255,0,0),Color(0,255,0),Color(0,0,255)]
text_colors = [Color(0,0,0),Color(255,0,0),Color(0,255,0),Color(0,0,255)]

while (not os.path.exists("./stop")):
	randomColor = random.choice(bright_colors)
	clockTextOnce(ledpixels,spidev,characters,":",randomColor,Color(0,0,0),1)

spidev.close()
if verbose:
	print "stopping led display"
