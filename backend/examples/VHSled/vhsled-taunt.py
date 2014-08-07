## control script for VHS's wall display array of WS2801 36mm Square LEDs   

import RPi.GPIO as GPIO, time, os, random
import datetime
from vhsled_spi import *
from vhsled_text import *
from vhsled_colour import *
from vhsled_rain import *

GPIO.setmode(GPIO.BCM)

#properties of our display
width = 42
height = 10
strings = ["Stop staring at me!", "Bored much?", "Get back to work!", "Stare less! Hack more!", "<Insert bad jokes here>", "Hi there! Why are you reading this wall? Nothing better to do?","Which of us is brighter?"]

ledpixels = []
for i in range(0,width):
	ledpixels.append([0]*height)

spidev = file("/dev/spidev0.0", "w")        		
random.seed()

loopinterval = 0.05

text_colors = [Color(65,0,0),Color(0,65,0),Color(0,0,65),Color(65,65,0),Color(0,65,65),Color(65,65,65)]

while (not os.path.exists("/home/pi/stop")):
	scrollText(ledpixels,spidev,characters,random.choice(strings),randomColor(),Color(0,0,0),loopinterval)
	###clockTextOnce(ledpixels,spidev,characters,":",random.choice(text_colors),Color(0,0,0))
spidev.close()
print "stopping led display"
