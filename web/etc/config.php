<?php

// If $config does not exist, create it.
if( ! isset( $config ) )
	$config = array();

// Load default configuration
require_once( 'config_defaults.php' );

// Load local configuration
require_once( 'config_local.php' );

// Setup the dsn
$config['db']['dsn'] = sprintf( "%s:host=%s;dbname=%s", $config['db']['type'], $config['db']['host'], $config['db']['name'] );

// RenderD URL
$config['renderd']['url'] = 'http://localhost:1337/render';

// Scripts
$config['scripts'] = array(
		"chaser-blue-fade.py",
		"chaser-green-fade.py",
		"chaser-multi-fade.py",
		"chaser-multi-fast.py",
		"chaser-red-fade.py",
		"chaser-switch-fade.py",
		"chaser-white-fade.py",
		"chaser-white-fast.py",
		"gradient.py",
		"starburst.py",
		"twinklestar-multicolour.py",
		"twinklestar-white.py",
);
?>