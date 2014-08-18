import json, requests, time, hmac, hashlib, math, socket
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

BRIDGE_IP, BRIDGE_PORT = '127.0.0.1', 9999

PYTHON_PATH = "/usr/bin/python"

def Debug( message ):
	if Debug: print message

controller = DomeController(BRIDGE_IP, BRIDGE_PORT, MASTER_URL, PLAYER_NAME, PLAYER_KEY)
controller.run()