<?php

class FrontEnd_API {

	private $dbconn;

	public function __construct() {
		$this->dbconn = ColoreDBConnector::getInstance();
	}

	public function GetUserInfo( ColoreRequestHelper &$cro ) {
		// Get request properties
		$request_properties = $cro->getRequestProperties();

		$userrealname = $request_properties['userrealname'];
		$useremail = $request_properties['useremail'];
		
		// Save user info
		$query = array(
				'action' => 'insert',
				'table' => 'users',
				'fields' => array(),
		);
		
	}
	
	public function StoreSequence( ColoreRequestHelper &$cro ) {
		// Get request properties
		$request_properties = $cro->getRequestProperties();

		$user_id = $cro->user_id;
		$useremail = $request_properties['useremail'];
		$sequence = $request_properties['sequence'];
		
		$token = hash( 'ripemd160', sprintf( "%s:%s", time(), serialize( $request_properties ) ) );

		$query = array(
				'action' => 'insert',
				'table' => 'animations',
				'fields' => array(
						'token' => $token,
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