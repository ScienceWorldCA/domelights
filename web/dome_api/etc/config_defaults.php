<?php

if( ! isset( $config ) )
	die( 'INVALID INCLUDE!' );

$config['db']['type'] = "mysql";
$config['db']['host'] = "localhost";
$config['db']['user'] = 'domelights';
$config['db']['pass'] = 'domelights';
$config['db']['name'] = 'domelights';

$config['email'] = array();
$config['email']['defaults'] = array();

$config['email']['headers'] = "";
$config['email']['headers'] .= "From: webmaster@scienceworld.ca\r\n";
$config['email']['headers'] .= "Reply-To: webmaster@scienceworld.ca\r\n";
$config['email']['headers'] .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Animation schedule confirmation
$config['email']['subject']['animation_shedule_confirmation'] = "Your Scienceworld Domelights animation has been scheduled!";
$config['email']['body']['animation_shedule_confirmation'] = "%s\r\n";
$config['email']['body']['animation_shedule_confirmation'] = "%s\r\n";

?>