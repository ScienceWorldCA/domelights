# Generates alternating frames of a checkerboard pattern. 

Q_STARTING_INDEX = 150 

UNIVERSE_LIGHTS = 144 #144 for side 1, #116 for side 2


flip = 0
for i in range(1,200): # 5 seconds * 40 / second  (frame)
	print "Record Cue " + str(Q_STARTING_INDEX + i) 
	for j in range (1, UNIVERSE_LIGHTS * 3, 1): # 3 channels / light (channel)
		value = 255 if flip else 0
		flip = not flip
		print "C"+ str(j)+ " @ #"+str(value)+";" 
	flip = not flip # switch the checkerboard for the next frame 
	print "Record Stop"
