<?php

$config['contexts'] = array();

$config['contexts']['ping'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'FrontEnd_API', 'method' => 'Reply' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'message' => 'Default context render property.',
		),
	),
);

$config['contexts']['storesequence'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'FrontEnd_API', 'method' => 'GetUserInfo' ),
		array( 'class' => 'FrontEnd_API', 'method' => 'StoreSequence' ),
// 		array( 'class' => 'FrontEnd_API', 'method' => 'ScheduleAnimation' ),
// 		array( 'class' => 'FrontEnd_API', 'method' => 'ConvertAnimation' ),
// 		array( 'class' => 'FrontEnd_API', 'method' => 'EmailSchedule' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => false,
			'message' => 'Failed',
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
			'page_title' => 'Example',
			'place_holder_message' => 'Welcome to the Colore example page!',
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
