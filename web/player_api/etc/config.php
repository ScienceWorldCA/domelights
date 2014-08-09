<?php

// If $config does not exist, create it.
if( ! isset( $config ) )
	$config = array();

$config['db']['type'] = "mysql";
$config['db']['host'] = "localhost";
$config['db']['user'] = 'domelights';
$config['db']['pass'] = '89hvuQ3921wr';
$config['db']['name'] = 'domelights';

$config['db']['dsn'] = sprintf( "%s:host=%s;dbname=%s", $config['db']['type'], $config['db']['host'], $config['db']['name'] );

?>