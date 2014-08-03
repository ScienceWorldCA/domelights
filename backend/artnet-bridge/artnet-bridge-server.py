from artnet import packet
import SocketServer
import time, os, random, datetime, sys
import socket
import struct
import glob

SocketServer.ThreadingTCPServer.allow_reuse_address = True

DEBUG = False
 
UDP_IP = "172.16.0.63"
UDP_PORT = 6454

LEDS_SIZE = 260
MAX_LEDS = (LEDS_SIZE*3)
U1_SIZE = 144
U2_SIZE = 116
U1_LEDS = (U1_SIZE*3)
U2_LEDS = (U2_SIZE*3)

sock = socket.socket( socket.AF_INET, socket.SOCK_DGRAM )

class MyTCPHandler(SocketServer.StreamRequestHandler):

	def handle(self):
		global sock
		from artnet import packet, dmx

		# self.rfile is a file-like object created by the handler;
		# we can now use e.g. readline() instead of raw recv() calls
		###self.data = self.rfile.readline().strip()
		self.data = self.request.recv(4096)

		if DEBUG:
			print "Received from {}:".format(self.client_address[0])
			print len(self.data)

		## Write artnet

		f1 = dmx.Frame()
		for i in range(0,U1_LEDS):
			f1[i] = ord( self.data[int(i)] )

		f2 = dmx.Frame()
		for i in range(U1_LEDS,MAX_LEDS):
			j = i - U1_LEDS
			f2[j] = ord( self.data[int(i)] )

		p1 = packet.DmxPacket( f1 )
		p1.universe = 0

		p2 = packet.DmxPacket( f2 )
		p2.universe = 1
		
		sock.sendto( p1.encode(), (UDP_IP, UDP_PORT) )
		sock.sendto( p2.encode(), (UDP_IP, UDP_PORT) )

if __name__ == "__main__":
	HOST, PORT = "localhost", 9999

	# Create the server, binding to localhost on port 9999
	server = SocketServer.TCPServer((HOST, PORT), MyTCPHandler, False)
	server.allow_reuse_address = True
	server.server_bind()
	server.server_activate()


	# Activate the server; this will keep running until you
	# interrupt the program with Ctrl-C
	server.serve_forever()
