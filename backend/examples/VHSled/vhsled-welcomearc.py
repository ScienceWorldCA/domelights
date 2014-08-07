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
strings = ["VHS! VHS!", "Welcome to the Bunker", "Feed Donatio!", "HELLO WORLD!", "All your base are belong to us", "This statement is false       the previous statement is true"]
oddstrings  = ["subliminal message","fnord"]

ledpixels = []
for i in range(0,width):
	ledpixels.append([0]*height)

spidev = file("/dev/spidev0.0", "w")        		
random.seed()

###rain(ledpixels,spidev,randomColor(),0.05,1000000000)
###print "rain test complete"
###countdownText(ledpixels,spidev,characters,3,randomColor(),Color(0,0,0),1)
###print "countdown test complete"
###colorwipe_snake(ledpixels,spidev,randomColor(),0.005)
###print "snake test complete"
###colorFlashMode(ledpixels,spidev,random.randint(0,20),0.5)
###print "flash test complete"
###colorwipe_horiz(ledpixels,spidev,randomColor(),0.0005,-1)
###print "horizontal wipe test complete"
###rainbowCycle(ledpixels,spidev, 0.0)
###print "rainbow cycle test complete"
###rainbowBoard(ledpixels,spidev,0.0)
###print "rainbow board test complete"
###scrollText(ledpixels,spidev,characters,random.choice(strings),randomColor(),Color(0,0,0),0.05)
###scrollText(ledpixels,spidev,characters,random.choice(oddstrings),random.choice(bright_colors),random.choice(bright_colors),0.001)
###print "text scrolling test complete"
###print "TEST COMPLETE: PROCEEDING TO PROGRAM MODE"
#status report of different self-tests in real time

loopinterval = 0.05

background_colors = [Color(0,0,0),Color(255,0,0),Color(0,255,0),Color(0,0,255)]

while (not os.path.exists("/home/pi/stop")):
	scrollText(ledpixels,spidev,characters,"Welcome VHS Amateur Radio Club",randomColor(),Color(0,0,0),loopinterval)
	clockTextOnce(ledpixels,spidev,characters,":",random.choice(background_colors),Color(0,0,0),1)
spidev.close()
print "stopping led display"
