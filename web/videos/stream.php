<?php

$allowed_files = array(
	"rainbow_rain.mp4",
	"rainbow_wave.mp4",
	"uv_meter.mp4"
);

if( in_array( $_GET['file'], $allowed_files ) ) {
	header( "Content-Type: video/mp4" );
	echo file_get_contents( $_GET['file'] );
}
