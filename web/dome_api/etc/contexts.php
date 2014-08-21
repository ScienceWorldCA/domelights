<?php

$config['contexts'] = array();

$config['contexts']['GetControllerState'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'DomeController', 'method' => 'AuthenticateController' ),
		array( 'class' => 'DomeController', 'method' => 'GetControllerState' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
		),
	),
);

$config['contexts']['GetScheduledAnimationScript'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'DomeController', 'method' => 'AuthenticateController' ),
		array( 'class' => 'DomeController', 'method' => 'GetScheduledAnimationScript' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
		),
	),
);

$config['contexts']['GetScheduledShow'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'DomeController', 'method' => 'AuthenticateController' ),
		array( 'class' => 'DomeController', 'method' => 'GetScheduledShow' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
		),
	),
);

$config['contexts']['Ping'] = array(
		'properties' => array(
		),
		'logic' => array(
				array( 'class' => 'Ping', 'method' => 'Reply' ),
		),
		'render' => array(
				'engine' => 'Render_JSON',
				'path' => '',
				'properties' => array(
						'message' => 'Alive',
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
