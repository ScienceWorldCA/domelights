<?php

$config['contexts'] = array();

$config['contexts']['GetPlayerState'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'DomePlayer', 'method' => 'GetPlayerState' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'active' => false,
		),
	),
);

$config['contexts']['default'] = array(
	'properties' => array(
	),
	'logic' => array(
	),
	'render' => array(
		'engine' => 'Render_Simple',
		'path' => 'default.php',
		'properties' => array(
			'page_title' => 'Dome Lights',
			'place_holder_message' => 'Nothing here!',
		),
	),
);

$config['contexts']['error'] = array(
	'properties' => array(
	),
	'logic' => array(
	),
	'render' => array(
		'engine' => 'Render_Simple',
		'path' => 'error.php',
		'properties' => array(
			'page_title' => 'Error',
			'error_message' => 'Placeholder error message',
		),
	),
);

?>
