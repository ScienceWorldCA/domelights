<?php

class FrontEnd_API {

	private $dbconn;

	public function __construct() {
		$this->dbconn = ColoreDBConnector::getInstance();
	}

	public function GetUserInfo( ColoreRequestHelper &$cro ) {
		// Get request properties
		$request_properties = $cro->getRequestProperties();

		// Check input
		if( ! $cro->getRequestProperties( 'useremail' ) ) ) {
			$cro->setRenderProperty( 'message', 'Missing email address' );
			$cro->setRenderProperty( 'result', false );
			return false;
		}

		$useremail = $cro->getRequestProperties( 'useremail' );

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
		if( ! $user_info ) {
			$cro->insertLogic( array( 'class' => 'FrontEnd_API', 'method' => 'StoreUserInfo' ) );
		} else {
			$cro->user_id = $user_info['id'];
			$cro->userrealname = $request_properties['userrealname'];
			$cro->useremail = $request_properties['useremail'];
		}
	}

	public function StoreUserInfo( ColoreRequestHelper &$cro ) {
		// Get input
		$userrealname = $cro->getRequestProperties( 'userrealname' );
		$useremail = $cro->getRequestProperties( 'useremail' );

		// Verify input
		if( ! $userrealname || ! $useremail || ! filter_var( $useremail, FILTER_VALIDATE_EMAIL ) ) {
			$cro->setRenderProperty( 'message', 'Missing or invalid input' );
			$cro->setRenderProperty( 'result', false );
			return false;
		} else {
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
				$cro->setRenderProperty( 'message', 'Missing email address' );
				$cro->setRenderProperty( 'result', false );
				return false;
			}
		}
	}

	public function StoreSequence( ColoreRequestHelper &$cro ) {
		// Get request properties
		$request_properties = $cro->getRequestProperties();

		$user_id = $cro->user_id;
		$sequence = $request_properties['sequence'];
		
		// Verify input
		if( ! is_numeric( $cro->user_id ) || ! $sequence ) {
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
			
		$cro->setRenderProperty( 'message', 'Published' );
		$cro->setRenderProperty( 'result', true );
		$cro->setRenderProperty( 'schedule_message', "Your animation has been scheduled for:\n\n%s\n\nYou will also receive an email containing this time." );
	}

}

?>