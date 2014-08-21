<?php

/**
 * The DomeController class controls the DomeController daemon
 */
class DomeController {

	private $dbconn;

	public function __construct() {
		$this->dbconn = ColoreDBConnector::getInstance();
	}
	
	public function AuthenticateController( ColoreRequestHelper &$cro ) {
		// Bail if authenticated
		if( $cro->getSessionProperty( 'authenticated' ) )
			return;
		
		// Set default
		$cro->setSessionProperty( 'authenticated', false );
		
		// Import request properties
		$request_properties = $cro->getRequestProperties();
		
		// Check input
		if( ! isset( $request_properties['controller_name'] ) || ! isset( $request_properties['timestamp'] ) || ! isset( $request_properties['hash'] ) ) {
			$cro->setRenderProperty( 'message', 'problem' );
			$cro->setRenderProperty( 'authenticated', 'error1' );
			return false;
		}

		// Set up query
		$controller_query = array(
			'action' => 'select',
			'table' => 'controllers',
			'fields' => array(
					'*' => true,
			),
			'criteria' => array(
					'name' => $request_properties['controller_name'],
			),
		);
		
		// Execute query
		$controller_info = $this->dbconn->mappedQuery( $controller_query );

		// Check for valid controller information
		if( ! $controller_info || ! is_array( $controller_info ) || ! isset( $controller_info['secret'] ) ) {
			$cro->setRenderProperty( 'authenticated', false );
			$cro->setRenderProperty( 'message', 'Error in controller lookup' );
			return false;
		}
		
		// Recreate the message hash
		$message_hash = hash_hmac( 'sha256', sprintf( "%s%s%s", $controller_info['name'], $request_properties['timestamp'], $controller_info['secret'] ), $controller_info['secret'] );
		
		// Check if hash matches, else bail
		if( $message_hash != $request_properties['hash'] ) {
			$cro->setRenderProperty( 'authenticated', false );
			$cro->setRenderProperty( 'error', 'Error verifying controller' );
			return false;
		}
		
		// Set session info
		$cro->setSessionProperty( 'controller_info', $controller_info );
		$cro->setSessionProperty( 'authenticated', true );

		// Set render info
		$cro->setRenderProperty( 'authenticated', true );
	}
	
	public function GetControllerState( ColoreRequestHelper &$cro ) {
		$controller_info = $cro->getSessionProperty( 'controller_info' );
		
		// Set up query
		$controller_state_query = array(
				'action' => 'select',
				'table' => 'controllers',
				'fields' => array(
						'mode' => true,
				),
				'criteria' => array(
						'id' => $controller_info['id'],
				),
		);
		
		// Execute query
		$controller_state_result = $this->dbconn->mappedQuery( $controller_state_query );
		
		// Check result, bail on fail
		if( ! is_array( $controller_state_result ) || ! isset( $controller_state_result['mode'] ) ) {
			$cro->setRenderProperty( 'error', 'Error looking up controller state' );
			return false;
		}
		
		// Set controller_active variable
		$controller_active = $controller_state_result['mode'];
		
		// Set state for rendering
		$cro->setRenderProperty( 'mode', $controller_active );
	}

	public function GetScheduledAnimationScript( ColoreRequestHelper &$cro ) {
		// Get controller info
		$controller_info = $cro->getSessionProperty( 'controller_info' );
		
		// Make query
		$script_query = array(
				'action' => 'select',
				'table' => 'controllers',
				'fields' => array(
						'script_name' => true,
				),
				'criteria' => array(
						'id' => $controller_info['id'],
				),
		);
		
		$script_result = $this->dbconn->mappedQuery( $script_query );
		
		if( is_array( $script_result ) && isset( $script_result['script_name'] ) ) {
			$cro->setRenderProperty( 'script_name', $script_result['script_name'] );
		} else {
			$cro->setRenderProperty( 'script_name', "gradient.py" );
		}
		
	}

	public function GetDefaultAnimationScript( ColoreRequestHelper &$cro ) {
		// Get controller info
		$controller_info = $cro->getSessionProperty( 'controller_info' );
		
		// Make query
		$script_query = array(
				'action' => 'select',
				'table' => 'controllers',
				'fields' => array(
						'script_name' => true,
				),
				'criteria' => array(
						'id' => $controller_info['id'],
				),
		);
		
		$script_result = $this->dbconn->mappedQuery( $script_query );
		
		if( is_array( $script_result ) && isset( $script_result['script_name'] ) ) {
			$cro->setRenderProperty( 'script_name', $script_result['script_name'] );
		} else {
			$cro->setRenderProperty( 'script_name', "gradient.py" );
		}
		
	}

	public function GetScheduledShow( ColoreRequestHelper &$cro ) {
		$cro->setRenderProperty( 'hasNewShow', false );
	}
	
}

?>
