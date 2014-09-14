<?php

class FrontEnd_API {

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

	/**
	 * Check the received user info
	 * @param ColoreRequestHelper $cro
	 * @return boolean
	 */
	public function CheckUserInfo( ColoreRequestHelper &$cro ) {
		$userrealname = $cro->getRequestProperties( 'userrealname' );
		$useremail = $cro->getRequestProperties( 'useremail' );

		// Check input
		if( ! $useremail ) {
			$cro->setRenderProperty( 'message', 'Missing email address' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}
		if( ! $userrealname ) {
			$cro->setRenderProperty( 'message', 'Missing or invalid real name' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}
		if( filter_var( $useremail, FILTER_VALIDATE_EMAIL ) ) {
			$cro->setRenderProperty( 'message', 'Invalid email address' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}
	}

	public function GetUserInfo( ColoreRequestHelper &$cro ) {
		// Get request properties
		$request_properties = $cro->getRequestProperties();

		$useremail = $cro->getRequestProperty( 'useremail' );

		// Get user info
		$query = array(
				'action' => 'select',
				'table' => 'users',
				'fields' => array(
						'*' => true,
				),
				'criteria' => array(
						'email' => $useremail,
				),
		);

		// Do query
		$user_info = $this->dbconn->mappedQuery( $query );

		// If not valid user, then schedule StoreUserInfo, else assign variables and continue
		if( ! $user_info || ! isset( $user_info['id'] ) || ! is_numeric( $user_info['id'] ) ) {
			$cro->insertLogic( array( 'class' => 'FrontEnd_API', 'method' => 'StoreUserInfo' ) );
		} else {
			$cro->user_id = $user_info['id'];
			$cro->userrealname = $request_properties['userrealname'];
			$cro->useremail = $request_properties['useremail'];
		}
	}

	public function StoreUserInfo( ColoreRequestHelper &$cro ) {
		// Get input
		$userrealname = $cro->getRequestProperty( 'userrealname' );
		$useremail = $cro->getRequestProperty( 'useremail' );
		
		// Store user info
		$query = array(
				'action' => 'insert',
				'table' => 'users',
				'fields' => array(
						'name' => $userrealname,
						'email' => $useremail,
				),
		);

		// Do query
		$user_stored = $this->dbconn->mappedQuery( $query );

		// If successful, schedule GetUserInfo execution to get user info, else bail
		if( $user_stored ) {
			$cro->insertLogic( array( 'class' => 'FrontEnd_API', 'method' => 'GetUserInfo' ) );
		} else {
			$cro->setRenderProperty( 'message', __LINE__ . ':Error saving user information' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}
	}

	public function StoreSequence( ColoreRequestHelper &$cro ) {
		// Get request properties
		$request_properties = $cro->getRequestProperties();

		$user_id = $cro->user_id;
		$sequence = $cro->getRequestProperty( 'sequence' );

		// Verify input
		if( ! is_numeric( $cro->user_id ) ) {
			$cro->setRenderProperty( 'message', 'Missing user input' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}
		if( ! $sequence ) {
			$cro->setRenderProperty( 'message', 'Missing animation input' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}

		$cro->animationToken = hash( 'ripemd160', sprintf( "%s:%s", time(), serialize( $request_properties ) ) );

		$query = array(
				'action' => 'insert',
				'table' => 'animations',
				'fields' => array(
						'token' => $cro->animationToken,
						'user_id' => $user_id,
						'source' => $sequence,
				),
		);

		$res = $this->dbconn->mappedQuery( $query );

		$animationID_result = $this->GetAnimationIDByToken( $cro->animationToken );
		
		if( ! $animationID_result ) {
			return false;
		}
		
		$cro->animationID = $animationID_result['id'];
			
		$cro->setRenderProperty( 'result', true );
	}

	public function ScheduleAnimation( ColoreRequestHelper &$cro ) {
		// Sanity checking
		if( ! $cro->animationID ) {
			$cro->setRenderProperty( 'message', 'Unknown error while scheduling animation. Please inform the staff.' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}

		// Get an instance of the scheduler
		$scheduler = $this->GetSchedulerInstance();

		// Schedule animation
		$schedule_result = $scheduler->UpdateAnimationScheduleTime( $cro->animationID );

		// Result checking
		if( ! $schedule_result ) {
			$cro->setRenderProperty( 'message', 'Failed to schedule animation. Please inform the staff.' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}

		// Make the query
		$query = array(
				'action' => 'select',
				'table' => 'animations',
				'fields' => array(
						'start' => true,
				),
				'criteria' => array(
						'id' => $cro->animationID,
				),
		);

		// Get the query result
		$schedule_start = $this->dbconn->mappedQuery( $query );

		// Result checking
		if( ! $schedule_start ) {
			$cro->setRenderProperty( 'message', 'Failed to retrieve animation schedule. Please inform the staff.' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}

		$cro->animationStartTime = $schedule_start['start'];
	}

	public function EmailSchedule( ColoreRequestHelper &$cro ) {
		global $config;

		$mail_result = mail(
				$cro->useremail, // Recipient
				$config['email']['subject']['animation_shedule_confirmation'], // Subject
				sprintf( $config['email']['body']['animation_shedule_confirmation'], $cro->userrealname, $cro->animationStartTime ), // Message
				$config['email']['headers'] // Headers
		);
		$cro->setRenderProperty( 'message', sprintf( "Your animation has been scheduled for:\n\n%s\n\nYou will also receive an email containing this time.", $cro->animationStartTime ) );
		$cro->setRenderProperty( 'result', true );
	}

	private function GetAnimationIDByToken( $token ) {
		// Do query
		$query = array(
				'action' => 'select',
				'table' => 'animations',
				'fields' => array(
						'id' => true
				),
				'criteria' => array(
						'token' => $token,
				),
		);

		return $this->dbconn->mappedQuery( $query );
	}


}

?>
