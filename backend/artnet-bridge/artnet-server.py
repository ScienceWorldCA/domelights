from artnet import *
import SocketServer
import time, os, random, datetime, sys
import argparse
import socket
import struct
from subprocess import Popen, PIPE, STDOUT
import glob

DEBUG = False
 
UDP_IP = "2.0.0.61"
UDP_PORT = 6454


