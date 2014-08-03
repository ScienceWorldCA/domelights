from artnet import packet, OPCODES, dmx
import socket
import random

DEBUG = False
 
UDP_IP = "172.16.0.63"
UDP_PORT = 6454
LEDS_SIZE = 260
MAX_LEDS = (LEDS_SIZE*3)
U1_SIZE = 144
U2_SIZE = 116
U1_LEDS = (U1_SIZE*3)
U2_LEDS = (U2_SIZE*3)

print "MAX LEDS:", MAX_LEDS
print "U1_SIZE:", U1_SIZE
print "U2_SIZE:", U2_SIZE

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

while True:

	f1 = dmx.Frame()
	for j1 in range( 0, U1_LEDS ):
		f1[j1] = random.randint( 0, 255 )

	f2 = dmx.Frame()
	for j2 in range( 0, U2_LEDS ):
		f2[j2] = random.randint( 0, 255 )

	p1 = packet.DmxPacket( f1 )
	p1.universe = 0
	x1 = p1.encode()
	
	p2 = packet.DmxPacket( f2 )
	p2.universe = 1
	x2 = p2.encode()

	sock.sendto( x1, (UDP_IP, UDP_PORT))
	sock.sendto( x2, (UDP_IP, UDP_PORT))
