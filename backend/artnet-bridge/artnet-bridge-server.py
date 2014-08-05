from artnet import packet,dmx
import SocketServer
import time, os, random, datetime, sys
import socket
import struct
import glob
import argparse

SocketServer.ThreadingTCPServer.allow_reuse_address = True

DEBUG = False

LEDS_SIZE = 260
MAX_BYTES = (LEDS_SIZE*3)
U1_SIZE = 144
U2_SIZE = 116
U1_BYTES = int(U1_SIZE*3)
U2_BYTES = int(U2_SIZE*3)

HOST, PORT = '', 9999

parser = argparse.ArgumentParser(description='Bridge from a TCP socket to ArtNet.')
parser.add_argument( 'ip_address', help='The ArtNet destination IP address.')
args = parser.parse_args()
if args.ip_address == None:
	parser.print_help()
	sys.exit()

ARTNET_IP = socket.gethostbyname( args.ip_address )
ARTNET_PORT = 6454

print "ArtNet Destination:", ARTNET_IP

try:
	sock = socket.socket( socket.AF_INET, socket.SOCK_STREAM )
except socket.error as msg:
 	sock = None

artnetsock = socket.socket( socket.AF_INET, socket.SOCK_DGRAM )

# Create the server, binding to localhost on port 9999
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
try:
	sock.bind((HOST, PORT))
	try:
		sock.listen(5)
	except socket.error as msg:
		sock.close
		sock = None
except socket.error as msg:
	sock.close()
	sock = None

emptyframe = []
	
f1 = dmx.Frame( emptyframe )
p1 = packet.DmxPacket( f1 )
p1.universe = 0

f2 = dmx.Frame( emptyframe )
p2 = packet.DmxPacket( f2 )
p2.universe = 1

if not sock:
	print "ERROR: Invalid socket"
	sys.exit()

while sock:
	try:
		conn, addr = sock.accept()
	except socket.error as msg:
		sock.close()
		sock = None
		break

	while True:
		data = conn.recv( MAX_BYTES )
		if not data: break

		## Write artnet

		if len(data) >= MAX_BYTES:
			for i in range(0,U1_BYTES):
				f1[i] = ord( data[int(i)] )
	
			for i in range(U1_BYTES,MAX_BYTES):
				j = i - U1_BYTES
				f2[j] = ord( data[int(i)] )
	
			artnetsock.sendto( p1.encode(), (ARTNET_IP, ARTNET_PORT) )
			artnetsock.sendto( p2.encode(), (ARTNET_IP, ARTNET_PORT) )

	conn.close()
