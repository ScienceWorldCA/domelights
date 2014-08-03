import SocketServer
import RPi.GPIO as GPIO, time, os, random, datetime, sys
import argparse
from subprocess import Popen, PIPE, STDOUT
import glob

DEBUG = False

LEDCount = 19

SocketServer.ThreadingTCPServer.allow_reuse_address = True

class LedStrip:
	spidev = None
	height = 10

	def __init__(self):
		self.spidev = file("/dev/spidev0.0", "w")

	def write(self,data):
		buffer = ''
		for i in range(0,(len(data)/3)):
			offset = i*3
			buffer = buffer + data[offset+2]
			buffer = buffer + data[offset+0]
			buffer = buffer + data[offset+1]
		strip.spidev.write( buffer )


class MyTCPHandler(SocketServer.StreamRequestHandler):

	def handle(self):
		# self.rfile is a file-like object created by the handler;
		# we can now use e.g. readline() instead of raw recv() calls
		self.data = self.rfile.readline().strip()
		if DEBUG:
			print "{} wrote:".format(self.client_address[0])
			print self.data

		## Write SPI
		###strip.spidev.write( self.data )
		strip.write( self.data )
		strip.spidev.flush()

if __name__ == "__main__":
	HOST, PORT = "0.0.0.0", 9999
	strip = LedStrip()

	# Create the server, binding to localhost on port 9999
	server = SocketServer.TCPServer((HOST, PORT), MyTCPHandler, False)
	server.allow_reuse_address = True
	server.server_bind()
	server.server_activate()

	# Activate the server; this will keep running until you
	# interrupt the program with Ctrl-C
	server.serve_forever()
