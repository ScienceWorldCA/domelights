<?php

/**
 * The DomeController class controls the DomeController daemon
 */
class DomeController {

	private $dbconn;
	private $schedule_instance = null;

	public function __construct() {
		$this->dbconn = ColoreDBConnector::getInstance();
	}

	/**
	 * Gets an instance of the Scheduler, maintaining a single instance. (Faux Singleton)
	 */
	private function GetSchedulerInstance() {
		if( $this->schedule_instance == null )
			$this->schedule_instance = new CSchedule();

		return $this->schedule_instance;
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
						'script_name' => true,
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

		// Set state for rendering
		$cro->setRenderProperty( 'mode', $controller_state_result['mode'] );
		$cro->setRenderProperty( 'script_name', $controller_state_result['script_name'] );

		if( $controller_state_result['mode'] == 0 )
			return;

		// Check for current event
		$event_data = $this->GetEvent();

		// If we have valid event data, override the current state
		if( $event_data && is_array( $event_data ) && isset( $event_data['id'] ) ) {
			$cro->setRenderProperty( 'mode', $event_data['type'] );
			$cro->setRenderProperty( 'script_name', $event_data['options'] );
		}

	}

	public function GetControllerTask( ColoreRequestHelper &$cro ) {
		error_log( sprintf( "%s: %s", __METHOD__, __LINE__ ) );
		// Get controller info
		$controller_info = $cro->getSessionProperty( 'controller_info' );

		// TODO: Schedule

		// Check for current event
		$event_data = $this->GetEvent();

		// If we have valid event data, return the result
		if( $event_data && is_array( $event_data ) && isset( $event_data['id'] ) ) {
			// If we receive a type 0 event, then override the controller state
			$cro->setRenderProperty( 'mode', $event_data['type'] );
			if( $event_data['type'] == 0 ) {
				return;
			} else if( $event_data['type'] == 2 ) {
				$cro->setRenderProperty( 'script_name', $event_data['options'] );
				return;
			} else if( $event_data['type'] != 1 ) {
				// If we receive invalid input, bail.
				return false;
			}
		}

		error_log( sprintf( "%s: %s", __METHOD__, __LINE__ ) );

		// If in animation playback mode, then lookup the current animation
		if( $cro->getRenderProperty( 'mode' ) == 1 ) {
			error_log( sprintf( "%s: Checking for animation", __METHOD__ ) );
			$scheduler = $this->GetSchedulerInstance();
			$animation_info = $scheduler->GetNextScheduleAnimation();
			if( $animation_info && is_array( $animation_info ) && isset( $animation_info['source'] ) ) {
				error_log( sprintf( "%s: Found animation", __METHOD__ ) );

				// Render the animation data
				$animation_data = $this->GetRenderedAnimation( $animation_info['source'] );

				// If successful, then set render properties and return - else fall back
				if( $animation_data ) {
					// Set script_name to domeplayer
					$cro->setRenderProperty( 'script_name', "domeplayer.py" );
					$cro->setRenderProperty( 'id', $animation_info['id'] );
					$cro->setRenderProperty( 'data', $animation_data );
					return;
				} else {
					error_log( sprintf( "%s: Animation render failed", __METHOD__ ) );
				}
			} else {
				error_log( sprintf( "%s: No animation found", __METHOD__ ) );
			}
		}

		error_log( sprintf( "%s: %s", __METHOD__, __LINE__ ) );

		// If not blacked out and a script was not set, then get the current controller's default script
		if( $cro->getRenderProperty( 'mode' ) != 0 && ! $cro->getRenderProperty( 'script_name' ) ) {
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
				$cro->setRenderProperty( 'id', null );
				$cro->setRenderProperty( 'data', null );
			} else {
				$cro->setRenderProperty( 'script_name', "gradient.py" );
			}
		}

		error_log( sprintf( "%s: %s", __METHOD__, __LINE__ ) );

	}

	private function GetRenderedAnimation( $source ) {
		error_log( sprintf( "%s: Executing for: %s", __METHOD__, $source ) );
		global $config;

		$curl_obj = curl_init( $config['renderd']['url'] );

		if( ! $curl_obj )
			return false;

		$post_fields = array(
				'sequence' => $source
		);

		curl_setopt( $curl_obj, CURLOPT_POST, 1);
		curl_setopt( $curl_obj, CURLOPT_POSTFIELDS, sprintf( 'sequence=%s', $source ) );

		$response = curl_exec( $curl_obj );
		curl_close( $curl_obj );

		if( $response === FALSE ){
			error_log( curl_error( $curl_obj ) );
			return false;
		}

		$responseData = json_decode($response, TRUE);

		if( $responseData && is_array( $responseData ) && isset( $responseData['sequence'] ) && isset( $responseData['result'] ) && $responseData['sequence'] == "OK" ) {
			return $responseData['sequence'];
		} else {
			return false;
		}
	}

	public function GetEvent() {
		// Simple query
		$query = "SELECT id, type, options FROM events WHERE now() BETWEEN start AND end AND active = 1 ORDER BY start ASC";

		// Do query
		$res = $this->dbconn->query( $query );

		// If we have a valid result, return it.
		if( $res && $res->rowCount() == 1 ) {
			$event_data = $res->fetch();
			return $event_data;
		} else {
			return false;
		}
	}

	public function GetScheduledShow( ColoreRequestHelper &$cro ) {
		$cro->setRenderProperty( 'hasNewShow', false );
		$scheduler = $this->GetSchedulerInstance();
	}

}

?>
