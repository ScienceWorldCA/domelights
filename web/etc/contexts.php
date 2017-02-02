<?php

$config['contexts'] = array();

$config['contexts']['dome_api/GetControllerState'] = array(
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

$config['contexts']['dome_api/GetControllerTask'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'DomeController', 'method' => 'AuthenticateController' ),
		array( 'class' => 'DomeController', 'method' => 'GetControllerState' ),
		array( 'class' => 'DomeController', 'method' => 'GetControllerTask' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
		),
	),
);

$config['contexts']['dome_api/SetAnimationPlayed'] = array(
	'properties' => array(
	),
	'logic' => array(
		array( 'class' => 'DomeController', 'method' => 'AuthenticateController' ),
		array( 'class' => 'DomeController', 'method' => 'SetAnimationPlayed' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
		),
	),
);

$config['contexts']['dome_api/Ping'] = array(
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

$config['contexts']['frontend_api/ping'] = array(
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

$config['contexts']['frontend_api/storesequence'] = array(
		'properties' => array(
		),
		'logic' => array(
				array( 'class' => 'FrontEnd_API', 'method' => 'CheckUserInfo' ),
				array( 'class' => 'FrontEnd_API', 'method' => 'GetUserInfo' ),
				array( 'class' => 'FrontEnd_API', 'method' => 'StoreSequence' ),
				array( 'class' => 'FrontEnd_API', 'method' => 'ScheduleAnimation' ),
				array( 'class' => 'FrontEnd_API', 'method' => 'EmailSchedule' ),
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

$config['contexts']['admin/ping'] = array(
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

$config['contexts']['admin/'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
	),
	'render' => array(
		'engine' => 'Render_Simple',
		'path' => 'admin.php',
		'properties' => array(
			'page_title' => 'Scienceworld Domelights Control Panel',
			'place_holder_message' => 'Welcome',
		),
	),
);

$config['contexts']['admin/api/session/login'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'Login' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
			'message' => 'Unknown error',
		),
	),
);

$config['contexts']['admin/api/session/authenticated'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'CheckAuthenticated' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'authenticated' => false,
		),
	),
);

$config['contexts']['admin/api/session/logout'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'Logout' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/session/info'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetUserInfo' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/admins/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetAdmins' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/admins/view'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetAdmin' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/animations/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetAnimations' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/events/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetEvents' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/schedules/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetSchedules' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/users/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetUsers' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/controllers/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetControllers' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/controllers/view'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'GetController' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/controllers/update'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'UpdateController' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/controllers/create'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'CreateController' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/controllers/delete'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
			array( 'class' => 'Admin', 'method' => 'DeleteController' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'ERROR',
		),
	),
);

$config['contexts']['admin/api/controllers/modes/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'OK',
			'modes' => array(
					array( 'id' => 0, 'description' => "Black Out" ),
					array( 'id' => 1, 'description' => "Animation Playback" ),
					array( 'id' => 2, 'description' => "Scripted" ),
			),
		),
	),
);

$config['contexts']['admin/api/controllers/scripts/list'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'RequireAuthenticated' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'OK',
			'scripts' => $config['scripts'],
		),
	),
);

$config['contexts']['admin/api/getnonce'] = array(
	'properties' => array(
	),
	'logic' => array(
			array( 'class' => 'Admin', 'method' => 'GetNonce' ),
	),
	'render' => array(
		'engine' => 'Render_JSON',
		'path' => '',
		'properties' => array(
			'result' => 'OK',
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
