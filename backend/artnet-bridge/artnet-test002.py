from artnet import packet, OPCODES, dmx
import socket
import random

DEBUG = False
 
UDP_IP = "172.16.0.63"
UDP_PORT = 6454

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

while True:

	f = dmx.Frame()

	for i in range(0,512):
		if DEBUG:
			print i
		f[i] = random.randint( 0, 255 )

	p1 = packet.DmxPacket( f )
	p1.universe = 0
	x1 = p1.encode()
	
	p2 = packet.DmxPacket( f )
	p2.universe = 1
	x2 = p2.encode()

	sock.sendto( x1, (UDP_IP, UDP_PORT))
	sock.sendto( x2, (UDP_IP, UDP_PORT))
