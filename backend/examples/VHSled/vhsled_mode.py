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

width = 42
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


while True:
	text = raw_input("display string (insert dev code or press enter to run countdown):")
	if len(text) > 0:
		if text == "flash": #undocumented mode to test the display
			while True:
				colorFlashMode(ledpixels,spidev,10,0.1)
		if text == "white":
			while True:
				setFullColor(ledpixels,spidev,Color(255,255,255))
		if text == "red":
			while True:
				setFullColor(ledpixels,spidev,Color(255,0,0))
		if text == "green":
			while True:
				setFullColor(ledpixels,spidev,Color(0,255,0))
		if text == "blue":
			while True:
				setFullColor(ledpixels,spidev,Color(0,0,255))
		if text == "snake": #undocumented mode to test the display
			while True:
				colorwipe_snake(ledpixels,spidev,randomColor(),0.05)
		if text == "wipe": #undocumented mode to test the display
			while True:
				colorwipe_horiz(ledpixels,spidev,randomColor(),0.0005,1)
		if text == "fades": #undocumented mode to test the display
			while True:
				rainbowBoard(ledpixels,spidev,0.0)
		if text == "rainbows": #undocumented mode to test the display
			while True:
				rainbowCycle(ledpixels,spidev, 0.00)
		if text == "clock": #undocumented mode to test the display
			while True:
				clockText(ledpixels,spidev,characters,":", random.choice(bright_colors),Color(0,0,0),1)
		if text == "subliminal": #undocumented mode to test the display
			while True:
				scrollText(ledpixels,spidev,characters,random.choice(oddstrings),random.choice(bright_colors),random.choice(bright_colors),0.001)
		elif text =="exit":
				break
		else:	
			scrollText(ledpixels,spidev,characters, text, random.choice(bright_colors),Color(0,0,0),0.05)

	else:
		seconds = int(raw_input("How many seconds?"))
		countdownText(ledpixels,spidev,characters,seconds, random.choice(bright_colors),Color(0,0,0),1)
	setFullColor(ledpixels,spidev,Color(0,0,0))


spidev.close