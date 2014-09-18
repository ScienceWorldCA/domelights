import json, requests, time, hmac, hashlib, math, socket, platform
import socket
import sys
import time
import random
import base64
from domelights import *

DEBUG = True

MASTER_URL = 'http://localhost/dome_api/'

PLAYER_NAME = 'controller01'
PLAYER_KEY = 'XPbZ65Fp0q0s'

if platform.system() == "Windows":
	PYTHON_PATH = "D:\Python27\Python.exe"
else:
	PYTHON_PATH = "/usr/bin/python"

def Debug( message ):
	if Debug: print message

controller = DomeController(MASTER_URL, PLAYER_NAME, PLAYER_KEY)
controller.run()