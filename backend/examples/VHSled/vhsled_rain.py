from vhsled_spi import *
from vhsled_colour import *
import random, time
from collections import deque

rain_strips = [1,0.9,0.8,0.5,0.3,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0.4,0.2,0,0,0,0,0],[1,0.9,0.9,0.6,0.5,0.5,0.4,0.3,0.2,0.1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]


#[1,0,0,0,0,0,0,0,0,0,0,0]
#[1,0.6,0.3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
#[1,1,1,0.9,0.9,0.8,0.8,0.7,0.657,0.614,0.571,0.529,0.486,0.443,0.4,0.357,0.314,0.271,0.229,0.186]
#[1,0.9,0.9,0.85,0.8,0.8,0.7,0.6,0.5,0.5,0.4,0.3,0.2,0.1,0,0,0,0,0,0,0,0,0,0]
#[1,0.7,0.4,0.3,0.2,0.1,0,0,0,0,0,0,0,0,0]
#[1,0.9,0.9,0.85,0.8,0.8,0.7,0.6,0.5,0.5,0.4,0.3,0.2,0.1,0,0,0,0,0,0,0,0,0,0]

def rain(pixels,spidev, c, delay, max_iterations):
    iterations = 0
    rain_columns = []
    for i in range(len(pixels)):
        a = deque(random.choice(rain_strips)+random.choice(rain_strips)+random.choice(rain_strips)+random.choice(rain_strips)+random.choice(rain_strips)+random.choice(rain_strips))
        a.rotate(random.randint(0,len(a)))
        rain_columns.append(a)
    while(iterations < max_iterations):    
        iterations +=1
        for i,column in enumerate(pixels):
            for j,row in enumerate(column):
                c = int(rain_columns[i][j]*255)
                pix_c = Color(c if i%2==0 else 0, 0 if i%2==0 else c,0)
                pixels[i][j] = pix_c
            rain_columns[i].rotate(-1)
        writestrip(pixels,spidev)
        time.sleep(delay)
