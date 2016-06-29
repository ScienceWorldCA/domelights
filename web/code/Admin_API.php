<?php

require_once( "BaseClass.php" );

class Admin_API extends BaseClass {

	public function Login( ColoreRequest &$cro ) {
		// Get request_properties
		$request_properties = $cro->getRequestProperties();
		
		if( ! isset( $request_properties['username'] ) || empty( $request_properties['username'] ) || ! isset( $request_properties['password'] ) || empty( $request_properties['password'] ) ) {
			$cro->setRenderProperty( 'message', 'Missing username and/or password' );
			return false;
		}
		
		if( ! filter_var( $request_properties['username'], FILTER_VALIDATE_EMAIL ) ) {
			$cro->setRenderProperty( 'message', 'Invalid username and/or password' );
			return false;
		}
		
		$admin_query = array(
				'action' => 'select',
				'table' => 'admins',
				'fields' => array(
						'email' => true,
						'password' => true,
						'name' => true,
				),
				'criteria' => array(
						'email' => $request_properties['username'],
				),
		);
		
		$admin_result = $this->dbconn->mappedQuery( $admin_query );
		
		if( ! $admin_result ) {
			$cro->setRenderProperty( 'message', 'An unknown error occurred.' );
			return false;
		}

		if( ! is_array( $admin_result ) || ! count( $admin_result ) ) {
			$cro->setRenderProperty( 'message', 'Invalid username and/or password.' );
			return false;
		}

		if( ! password_verify( sprintf( "%s:%s", $request_properties['username'], $request_properties['password']), $admin_result['password'] ) ) {
			$cro->setRenderProperty( 'message', 'Invalid username and/or password.' );
			return false;
		}

		unset( $admin_result['password'] );
		
		$cro->setSessionProperty( 'user_info', $admin_result );
		
		if( isset( $request_properties['remember'] ) && is_string( $request_properties['remember'] ) && ( $request_properties['remember'] == "true" ) )
			$cro->setSessionLifetime( 86400 );
		
		$cro->setSessionProperty( 'authenticated', true );
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'message', 'Login successful!' );

	}

	public function Logout( ColoreRequest &$cro ) {
		$cro->setSessionProperty( 'user_info', null );
		
		$cro->setSessionProperty( 'authenticated', false );
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'message', 'Logout successful!' );

	}

	public function CheckAuthenticated( ColoreRequest &$cro ) {
		$authenticated = $cro->getSessionProperty( 'authenticated' );
		
		if( is_null( $authenticated ) ) {
			$cro->setSessionProperty( 'authenticated', false );
			$authenticated = false;
		}
		
		$cro->authenticated = $authenticated;
		
		$cro->setRenderProperty( 'authenticated', $authenticated );
	}

	public function RequireAuthenticated( ColoreRequest &$cro ) {
		$authenticated = $cro->getSessionProperty( 'authenticated' );
		
		if( ! $authenticated ) {
			$cro->setRenderProperty( 'result', 'ERROR' );
			$cro->setRenderProperty( 'message', 'Not authenticated' );
			return false;
		}

		$cro->authenticated = $authenticated;
	}

	public function GetUserInfo( ColoreRequest &$cro ) {
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'user_info', $cro->getSessionProperty( 'user_info' ) );
	}

	public function GetControllers( ColoreRequest &$cro ) {
		// Make the query
		$controllers_query = array(
				'action' => 'select',
				'table' => 'controllers',
				'fields' => array(
						'id' => true,
						'name' => true,
						'mode' => true,
						'script_name' => true,
						'last_active' => true,
						'last_ip' => true,
						'last_animation' => true,
						'comment' => true,
				),
		);
		
		// Do the query
		$controllers_result = $this->dbconn->mappedQuery( $controllers_query );
		
		// Check the query
		if( ! $controllers_result )
			return false;
		
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'controllers', $controllers_result );
	}

	public function GetAnimations( ColoreRequest &$cro ) {
		// Make the query
		$animations_query = array(
				'action' => 'select',
				'table' => 'animations',
				'fields' => array(
						'*' => true,
				),
		);
		
		// Do the query
		$animations_result = $this->dbconn->mappedQuery( $animations_query );
		
		// Check the query
		if( ! $animations_result )
			return false;
		
		if( isset( $animations_result['id'] ) )
			$animations_result = array( $animations_result );
		
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'animations', $animations_result );
	}

	public function GetEvents( ColoreRequest &$cro ) {
		// Make the query
		$events_query = array(
				'action' => 'select',
				'table' => 'events',
				'fields' => array(
						'*' => true,
				),
		);
		
		// Do the query
		$events_result = $this->dbconn->mappedQuery( $events_query );
		
		// Check the query
		if( ! $events_result )
			return false;
		
		if( isset( $events_result['id'] ) )
			$events_result = array( $events_result );
		
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'events', $events_result );
	}

	public function GetSchedules( ColoreRequest &$cro ) {
		// Make the query
		$schedules_query = array(
				'action' => 'select',
				'table' => 'schedule',
				'fields' => array(
						'*' => true,
				),
		);
		
		// Do the query
		$schedules_result = $this->dbconn->mappedQuery( $schedules_query );
		
		// Check the query
		if( ! $schedules_result )
			return false;
		
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'schedules', $schedules_result );
	}

	public function GetAdmins( ColoreRequest &$cro ) {
		// Make the query
		$admins_query = array(
				'action' => 'select',
				'table' => 'admins',
				'fields' => array(
						'id' => true,
						'email' => true,
						'name' => true,
				),
		);
		
		// Do the query
		$admins_result = $this->dbconn->mappedQuery( $admins_query );
		
		// Check the query
		if( ! $admins_result )
			return false;
		
		if( isset( $admins_result['id'] ) )
			$admins_result = array( $admins_result );
		
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'admins', $admins_result );
	}

	public function GetUsers( ColoreRequest &$cro ) {
		// Make the query
		$users_query = array(
				'action' => 'select',
				'table' => 'users',
				'fields' => array(
						'*' => true,
				),
		);
		
		// Do the query
		$users_result = $this->dbconn->mappedQuery( $users_query );
		
		// Check the query
		if( ! $users_result )
			return false;
		
		$cro->setRenderProperty( 'result', 'OK' );
		$cro->setRenderProperty( 'users', $users_result );
	}

}

?>
