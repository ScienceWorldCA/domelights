import datetime
import time
from vhsled_spi import writestrip
from vhsled_colour import *



characters = {}
with open('font.txt', 'r') as m_f:
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


def scrollText(pixels,spidev, characters,text, text_c, background_c, speed):
        setFullColor(pixels,spidev,background_c)
        text_matrix = []
        padding_pixels = pixels
        character_spacing = [0 for i in range(len(pixels[0]))]
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
                writestrip(text_matrix[i:len(pixels)+i],spidev)
                time.sleep(speed)



def countdownText(pixels,spidev, characters,time_s, text_c, background_c,speed):
        setFullColor(pixels,spidev,background_c)
        padding_pixels = pixels
        character_spacing = [0 for i in range(len(pixels[0]))]
        #assemble the matrix components of the time
        for second in range(time_s,0,-1):
                text_matrix = []
                for char in str(second):
                        w, columns = characters[char.upper()]
                        for i,c in enumerate(columns):
                                text_matrix.append(c[::-1])
                        text_matrix.append(character_spacing)
                for x,col in enumerate(text_matrix):
                        for y,row in enumerate(col):
                                text_matrix[x][y] = text_c if row==1 else background_c
                text_matrix = text_matrix+pixels
                writestrip(text_matrix[0:len(pixels)],spidev)
                time.sleep(speed)

def clockText(pixels,spidev, characters,colon, text_c, background_c,speed):
        setFullColor(pixels,spidev,background_c)
        padding_pixels = pixels
        character_spacing = [0 for i in range(len(pixels[0]))]
        #assemble the matrix components of the time
        while True:
                text_matrix = []
                now = datetime.datetime.now()
		hour = str(now.hour)
		if len(hour) == 1:
			hour = " " + hour
        	for char in hour:
                        w, columns = characters[char.upper()]
                        for i,c in enumerate(columns):
                                text_matrix.append(c[::-1])
                        text_matrix.append(character_spacing)
                for char in str(colon):
                        w, columns = characters[char.upper()]
                        for i,c in enumerate(columns):
                                text_matrix.append(c[::-1])
                        text_matrix.append(character_spacing)
                for char in str("%02d"%now.minute):
                        w, columns = characters[char.upper()]
                        for i,c in enumerate(columns):
                                text_matrix.append(c[::-1])
                        text_matrix.append(character_spacing)
                for char in str(colon):
                        w, columns = characters[char.upper()]
                        for i,c in enumerate(columns):
                                text_matrix.append(c[::-1])
                        text_matrix.append(character_spacing)
                for char in str("%02d"%now.second):
                        w, columns = characters[char.upper()]
                        for i,c in enumerate(columns):
                                text_matrix.append(c[::-1])
                        text_matrix.append(character_spacing)
                for x,col in enumerate(text_matrix):
                        for y,row in enumerate(col):
                                text_matrix[x][y] = text_c if row==1 else background_c
                text_matrix = text_matrix+pixels
                writestrip(text_matrix[0:len(pixels)],spidev)
                time.sleep(speed)

def clockTextOnce(pixels,spidev, characters,colon, text_c, background_c):
        ###setFullColor(pixels,spidev,Color(0,0,0))
        padding_pixels = pixels
        character_spacing = [0 for i in range(len(pixels[0]))]
        #assemble the matrix components of the time
        text_matrix = []
        now = datetime.datetime.now()
	hour = str(now.hour)
	if len(hour) == 1:
		hour = " " + hour
        for char in hour:
                w, columns = characters[char.upper()]
                for i,c in enumerate(columns):
                        text_matrix.append(c[::-1])
                text_matrix.append(character_spacing)
        for char in str(colon):
                w, columns = characters[char.upper()]
                for i,c in enumerate(columns):
                        text_matrix.append(c[::-1])
                text_matrix.append(character_spacing)
        for char in str("%02d"%now.minute):
                w, columns = characters[char.upper()]
                for i,c in enumerate(columns):
                        text_matrix.append(c[::-1])
                text_matrix.append(character_spacing)
        for char in str(colon):
                w, columns = characters[char.upper()]
                for i,c in enumerate(columns):
                        text_matrix.append(c[::-1])
                text_matrix.append(character_spacing)
        for char in str("%02d"%now.second):
                w, columns = characters[char.upper()]
                for i,c in enumerate(columns):
                        text_matrix.append(c[::-1])
                text_matrix.append(character_spacing)
        for x,col in enumerate(text_matrix):
                for y,row in enumerate(col):
                        text_matrix[x][y] = text_c if row==1 else background_c
                text_matrix = text_matrix+pixels
        writestrip(text_matrix[0:len(pixels)],spidev)

def displayTextOnce(pixels,spidev, characters,text, text_c, background_c,speed):
        setFullColor(pixels,spidev,background_c)
        padding_pixels = pixels
        character_spacing = [0 for i in range(len(pixels[0]))]
        #assemble the matrix components of the time
        text_matrix = []
        now = datetime.datetime.now()
        for char in text:
                w, columns = characters[char.upper()]
                for i,c in enumerate(columns):
                        text_matrix.append(c[::-1])
                text_matrix.append(character_spacing)
        for x,col in enumerate(text_matrix):
                for y,row in enumerate(col):
                        text_matrix[x][y] = text_c if row==1 else background_c
                text_matrix = text_matrix+pixels
        writestrip(text_matrix[0:len(pixels)],spidev)
        time.sleep(speed)
