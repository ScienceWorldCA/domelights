# a more accurate name for this would be timer.py, however the "spec"
#  calls for the pi based timer to be called piMC.py. Who am I to argue.
import RPi.GPIO as GPIO, time, os, random
import datetime
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

width = 26
height = 10
strings = ["VHS ! VHS !", "Welcome to the Bunker","drink beer", "hack the planet", "42", "feed donatio", "go hack something", "the cake is a lie !"]
oddstrings  = ["subliminal message","They Live","fight the power","buy our stuff!"]

ledpixels = []
for i in range(0,width):
	ledpixels.append([0]*height)

spidev = file("/dev/spidev0.0", "w")

random.seed()

c = randomColor()
setFullColor(ledpixels,spidev,c)

# a few nice and bright colours with at least one channel at full. 
bright_colors = [Color(0,255,0),Color(0,0,255),Color(255,255,0),Color(255,0,255),Color(0,255,255)]


while (not os.path.exists("/home/pi/stop")):
	clockText(ledpixels,spidev,characters,":", random.choice(bright_colors),Color(0,0,0),2)
