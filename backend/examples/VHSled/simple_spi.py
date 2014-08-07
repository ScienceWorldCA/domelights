import RPi.GPIO as GPIO, time, os
import random

GPIO.setmode(GPIO.BCM)

width = 26
height = 10

ledpixels = []
for i in range(0,width):
	ledpixels.append([0]*height)

spidev = file("/dev/spidev0.0", "w")

characters = {}
with open('/home/pi/font.txt', 'r') as m_f:
    m_lines = m_f.readlines()
    for m_i in range(0,len(m_lines),10):
        m_character = m_lines[m_i][0]
        #characters are 8 rows of width  
        m_width = int(m_lines[m_i+1])
        m_columns = []
        for m_j in range(0,m_width):
            m_columns.append([0]*10)
	for m_j in range(0,8):
            m_line = str(m_lines[m_i+m_j+2])[:-1] # drop newline
            for ind,m_char in enumerate(m_line):
		    m_columns[ind][m_j+1] = 1 if m_char == "#" else 0
        characters[m_character]=m_width,m_columns


def scrollText(pixels, characters,text, text_c, background_c, speed):
	setFullColour(pixels,background_c)
	text_matrix = []
	padding_pixels = pixels
	character_spacing = [0 for i in range(height)]
	#assemble the matrix components of the text
	for char in text:
		w, columns = characters[char.upper()]
		for i,c in enumerate(columns):
			# ick - our matrix is indexed from the bottom counting up, but the characters are 
			     #edited going down. reverse the row ordering. 
			text_matrix.append(c[::-1])
		text_matrix.append(character_spacing)
	for x,col in enumerate(text_matrix):
		for y,row in enumerate(col):
			text_matrix[x][y] = text_c if row==1 else background_c
	text_matrix = pixels+text_matrix+pixels
	for i in range(len(text_matrix)-len(pixels)+1):
		writestrip(text_matrix[i:len(pixels)+i])
		time.sleep(speed)

def writestrip(pixels):
        for i in range(0,width,1):
		start = 0
	        end = height
	        step = 1
		if (i % 2 == 1):
		     start = height-1
	             end = -1
	             step = -1
		for j in range(start,end,step):
		     spidev.write(chr((pixels[i][j]>>16) & 0xFF))
	             spidev.write(chr((pixels[i][j]>>8) & 0xFF))
	             spidev.write(chr(pixels[i][j] & 0xFF))
	spidev.flush()

def Color(r,g,b):
	return ((b & 0xFF) << 16) | ((r & 0xFF) << 8) | (g & 0xFF)

def setpixelcolor(pixels, x,y, r, g, b):
	pixels[x][y] = Color(r,g,b)

def setpixelcolor(pixels, x,y, c):
	pixels[x][y] = c

def colorwipe_vertical(pixels, c, delay,direction):
	for i in range(width)[::direction]:
		for j in range(height)[::direction]:
			setpixelcolor(pixels, i,j, c)
			writestrip(pixels)
			time.sleep(delay)

def colorwipe_horiz(pixels, c, delay,direction):
	for i in range(0,height)[::direction]:
		for j in range(0,width)[::direction]:
			setpixelcolor(pixels, j,i, c)
			writestrip(pixels)
			time.sleep(delay)

def simpleGol(pixels, initial_points, live_c, dead_c, step_time, iterations):
	#not actually working yet.
	return
	setFullColour(pixels,dead_c)
	for i in range(initial_points):
		pixels[random.randint(0,width)][random.randint(0,height)] = live_c
		
	for i in range(iterations):
		new_pixels = pixels
	#	for x in range(width):
	#		for y in range(height):
	#		        
				
def countdown_timer(pixels, c, time_s):
	setFullColour(pixels,c)
	for i in range (0,height):
		for j in range(0,width):
			setpixelcolor(pixels,j,i,Color(0,0,0))
			writestrip(pixels)
			time.sleep(time_s/(width*height))

def Wheel(WheelPos):
	if (WheelPos < 85):
   		return Color(WheelPos * 3, 255 - WheelPos * 3, 0)
	elif (WheelPos < 170):
   		WheelPos -= 85;
   		return Color(255 - WheelPos * 3, 0, WheelPos * 3)
	else:
		WheelPos -= 170;
		return Color(0, WheelPos * 3, 255 - WheelPos * 3)

def rainbowBoard(pixels, wait):
	for j in range(256): # one cycle of all 256 colors in the wheel
    	   for i in range(width):
		   for k in range(height):
# tricky math! we use each pixel as a fraction of the full 96-color wheel
# (thats the i / strip.numPixels() part)
# Then add in j which makes the colors go around per pixel
# the % 96 is to make the wheel cycle around
			   setpixelcolor(pixels, i,k, Wheel( ((i * 256 / (width*height)) + j) % 256) )
	   writestrip(pixels)
	   time.sleep(wait)

def colourFlashMode(pixels,iterations, delay):
	for i in range(0,iterations):
		c = randomColour()
		for i in range(width):
			for j in range(height):
				setpixelcolor(ledpixels, i,j, c)
		writestrip(pixels)
		time.sleep(delay)

def rainbowCycle(pixels, wait):
        for j in range(256): # one cycle of all 256 colors in the wheel                                   
           for i in range(width):
                   for k in range(height):
# tricky math! we use each pixel as a fraction of the full 96-color wheel                                 
# (thats the i / strip.numPixels() part)                                                                  
# Then add in j which makes the colors go around per pixel                                                
# the % 96 is to make the wheel cycle around                                                              
                           setpixelcolor(pixels, i,k, Wheel( (((i*width+k) * 256 / ((width*height)) + j)) % 256) )
           writestrip(pixels)
           time.sleep(wait)

def setFullColour(pixels, c):
	for i in range(width):
		for j in range(height):
			setpixelcolor(pixels, i,j, c)
	writestrip(pixels)

def randomColour():
	#lots of magic here - this produces values that look "nice" to me.
	c = [0,0,0]
	c[0] = random.randrange(150,255,3)
	c[1] = random.randrange(25,90,3)
	c[2] = random.randrange(0,50,3)
	random.shuffle(c)
	return Color(c[0],c[1],c[2])

c = randomColour()
setFullColour(ledpixels,c)

bright_colours = [Color(255,0,0),Color(0,255,0),Color(0,0,255),Color(255,255,255),Color(255,255,0),Color(255,0,255),Color(0,255,255)]

a="""
while True:
	text = raw_input("say string (or empty to start countdown):")
	if len(text) > 0:
		if text == "flash":
			while True:
				colourFlashMode(ledpixels,10,0.1)
		else:	
			scrollText(ledpixels,characters, text, random.choice(bright_colours),Color(0,0,0),0.05)
	else:
		countdown_timer(ledpixels, random.choice(bright_colours),90.0)
	setFullColour(ledpixels,Color(0,0,0))
"""

while True:
	action = random.randint(0,7)
	if action == 0:
		colourFlashMode(ledpixels,random.randint(0,20),0.1)
	elif action == 1:
		wipe = random.choice([0,1])
		if wipe == 0:
			colorwipe_vertical(ledpixels,randomColour(), 0.0005,random.choice([-1,1]))
		elif wipe == 1:
			colorwipe_horiz(ledpixels,randomColour(),0.0005,random.choice([-1,1]))
	elif action == 2:
		rainbowCycle(ledpixels, 0.00)
	elif action == 3:
		rainbowBoard(ledpixels,0.0)
	elif action >=4 and action < 7:
		strings= ["VHS! VHS!", "Welcome to the Bunker","drink beer", "sorry, We Lied about the cake","hack the planet", "42", "feed donatio"]
		scrollText(ledpixels,characters, random.choice(strings),randomColour(),Color(0,0,0),0.05)
	elif action ==7:
		oddityroll = random.randint(0,100)
		oddstrings = ["fnord", "subliminal message"]
		bright_colours = [Color(255,0,0),Color(0,255,0),Color(0,0,255),Color(255,255,255)]
		if oddityroll > 95:
			scrollText(ledpixels,characters,random.choice(oddstrings),random.choice(bright_colours),random.choice(bright_colours),0.001)



random.seed()
spidev.close()
