import socket
import sys
import time

HOST, PORT = "localhost", 9999

FIXTURES=260

for b in range(0,16):
	for g in range(0,16):
		for r in range(0,16):
			print "Sending:", r, g, b
			sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
			sock.connect((HOST, PORT))
			data = ''
			for j in range(0,FIXTURES):
				data = data + chr(r*16) ## Red
				data = data + chr(g*16) ## Green
				data = data + chr(b*16) ## Blue
			try:
				sock.sendall(data+"\n")
			except socket.error as msg:
				print msg
				sock.close()
			time.sleep(0.0625)
