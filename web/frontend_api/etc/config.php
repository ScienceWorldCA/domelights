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

?>