rom vhsled_spi import *
from vhsled_colour import *
import random, time, copy

def simpleGol(pixels, spidev,initial_points, step_time, max_iterations):
	#not finished yet.
	#return
	iterations = 0
	bright_colors = [Color(255,0,0),Color(0,255,0),Color(0,0,255),Color(255,255,255)]
	setFullColor(pixels,spidev,Color(0,0,0))
	#setup the seed points
	max_x = len(pixels)
	max_y = len(pixels[0])
	for i in range(0,initial_points):
		x = random.randint(0,max_x)
		y = random.randint(0,max_y)
		setpixelcolor(pixels,x,y,random.choice(bright_colors))
	pixels_buffer = copy.deepcopy(pixels)
	while (iterations < max_iterations):
		for i,column in enumerate(pixels)[1:-1]:
			for j,row in enumerate(pixels[i])[1:-1]:
			        r_t = g_t = b_t = 0
				neighbours= [pixels[i-1][j-1],pixels[i-1][j],pixels[i-1][j+1],pixels[i][j+1],pixels[i][j-1],pixels[i+1][j-1],pixels[i+1][j],pixels[i+1][j+1]]
				for neighbour in neighbours:
					r,g,b = getRGB(neighbour)
					r_t += r
					g_t += g
					b_t += b
				total_brightness = int((r_t+g_t+b_t)/8)
				if (total_brightness <= 75):  #we're lonely. Fade.
					setpixelcolor(pixel_buffer,i,j,int(r_t/8*0.2)
	



