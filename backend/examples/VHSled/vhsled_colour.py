# functions for dealing with colours on our WS2801 36mm Square LEDs
#  also some simple colour transition display modes

# Based on Adafruit's example code: https://github.com/adafruit/Adafruit-Raspberry-Pi-Python-Code/blob/master/Adafruit_LEDpixels/Adafruit_LEDpixels.py

import random, time
from vhsled_spi import *

def Color(r,g,b):
	return ((b & 0xFF) << 16) | ((r & 0xFF) << 8) | (g & 0xFF)

def getRGB(c):
	g = c & 0xFF
	r = (c >> 8) & 0xFF
	b = (c >> 16)& 0xFF
	return r,g,b

def setpixelcolor(pixels, x,y, r, g, b):
	pixels[x][y] = Color(r,g,b)

def setpixelcolor(pixels, x,y, c):
	pixels[x][y] = c

bright_colors = [Color(255,0,0),Color(0,255,0),Color(0,0,255),Color(255,255,255),Color(255,255,0),Color(255,0,255),Color(0,255,255)]


def randomColor():
	#lots of magic here - this produces bright colours that look "nice" to me on our display.
	c = [0,0,0]
	c[0] = random.randrange(150,255,3)
	c[1] = random.randrange(25,90,3)
	c[2] = random.randrange(0,50,3)
	random.shuffle(c)
	return Color(c[0],c[1],c[2])

def setFullColor(pixels,spidev, c):
	for i in range(len(pixels)):
		for j in range(len(pixels[0])):
			setpixelcolor(pixels, i,j, c)
	writestrip(pixels,spidev)

def colorFlashMode(pixels,spidev,iterations, delay):
	for i in range(0,iterations):
		c = randomColor()
		for i in range(len(pixels)):
			for j in range(len(pixels[0])):
				setpixelcolor(pixels, i,j, c)
		writestrip(pixels,spidev)
		time.sleep(delay)

def colorwipe_vertical(pixels,spidev, c, delay,direction):
	for i in range(len(pixels))[::direction]:
		for j in range(len(pixels[0]))[::direction]:
			setpixelcolor(pixels, i,j, c)
			writestrip(pixels,spidev)
			time.sleep(delay)

def colorwipe_horiz(pixels,spidev, c, delay,direction):
	for i in range(0,len(pixels[0]))[::direction]:
		for j in range(0,len(pixels))[::direction]:
			setpixelcolor(pixels, j,i, c)
			writestrip(pixels,spidev)
			time.sleep(delay)

def colorwipe_snake(pixels,spidev, c, delay):
	for i in range(0,len(pixels),1):
		start = 0
		end = len(pixels[0])
		step = 1
		if (i % 2 == 1):
			start = len(pixels[0])-1
			end = -1
			step = -1
		for j in range(start,end,step):
			setpixelcolor(pixels, i,j, c)
			writestrip(pixels,spidev)
			time.sleep(delay)

def Wheel(WheelPos):
	if (WheelPos < 85):
		return Color(WheelPos * 3, 255 - WheelPos * 3, 0)
	elif (WheelPos < 170):
		WheelPos -= 85;
		return Color(255 - WheelPos * 3, 0, WheelPos * 3)
	else:
		WheelPos -= 170;
		return Color(0, WheelPos * 3, 255 - WheelPos * 3)

def rainbowBoard(pixels,spidev, wait):
	for j in range(256): # one cycle of all 256 colors in the wheel
		for i in range(len(pixels)):
			for k in range(len(pixels[0])):
# tricky math! we use each pixel as a fraction of the full 96-color wheel
# (thats the i / strip.numPixels() part)
# Then add in j which makes the colors go around per pixel
# the % 96 is to make the wheel cycle around
				setpixelcolor(pixels, i,k, Wheel( ((i * 256 / (len(pixels)*len(pixels[0]))) + j) % 256) )
		writestrip(pixels,spidev)
		time.sleep(wait)

def rainbowCycle(pixels,spidev, wait):
	for j in range(256): # one cycle of all 256 colors in the wheel                                   
		for i in range(len(pixels)):
			for k in range(len(pixels[0])):
# tricky math! we use each pixel as a fraction of the full 96-color wheel                                 
# (thats the i / strip.numPixels() part)                                                                  
# Then add in j which makes the colors go around per pixel                                                
# the % 96 is to make the wheel cycle around                                                              
				setpixelcolor(pixels, i,k, Wheel( (((i*len(pixels)+k) * 256 / ((len(pixels)*len(pixels[0]))) + j)) % 256) )
		writestrip(pixels,spidev)
		time.sleep(wait)

def fadeInColor(pixels,spidev, c, delay):
	for brightness in range(8):
		for i in range(len(pixels)):
			for j in range(len(pixels[0])):
				setpixelcolor(pixels, i,j, c)
		writestripWithBrightness(pixels,spidev,(brightness*32))

def fadeOutColor(pixels,spidev, c, delay):
	for brightness in range(8):
		for i in range(len(pixels)):
			for j in range(len(pixels[0])):
				setpixelcolor(pixels, i,j, c)
		writestripWithBrightness(pixels,spidev,(255-(brightness*32)))
		###time.sleep(delay/255)
