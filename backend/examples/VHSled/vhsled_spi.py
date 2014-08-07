import time, os

def writestrip(pixels,sock):
	data = ''
	for i in range(0,len(pixels),1):
		start = 0
		end = len(pixels[0])
		step = 1
		if (i % 2 == 1):
			start = len(pixels[0])-1
			end = -1
			step = -1
		for j in range(start,end,step):
			data = data + chr((pixels[i][j]>>16) & 0xFF)
			data = data + chr((pixels[i][j]>>8) & 0xFF)
			data = data + chr(pixels[i][j] & 0xFF)

	try:
		sock.send(data)
	except socket.error as msg:
		print msg


def writestripWithBrightness(pixels,sock,brightness):
	data = ''
	for i in range(0,len(pixels),1):
		start = 0
		end = len(pixels[0])
		step = 1
		if (i % 2 == 1):
			start = len(pixels[0])-1
			end = -1
			step = -1
		for j in range(start,end,step):
			data = data + chr((pixels[i][j]>>16) & brightness)
			data = data + chr((pixels[i][j]>>8) & brightness)
			data = data + chr(pixels[i][j] & brightness)

	try:
		sock.send(data)
	except socket.error as msg:
		print msg
