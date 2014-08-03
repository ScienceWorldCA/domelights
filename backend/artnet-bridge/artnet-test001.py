from artnet import packet
import socket

DEBUG = False
 
UDP_IP = "172.16.0.63"
UDP_PORT = 6454

frame = ''

for i in range( 0, 512 ):
	frame.join( chr(255) )

p = packet.DmxPacket( frame )
x = p.encode()

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto( x, (UDP_IP, UDP_PORT))
