<?php

/**
 * The DomePlayer class controls the DomePlayer daemon
 */
class DomePlayer {

	private $dbconn;

	public function __construct() {
		$this->dbconn = ColoreDBConnector::getInstance();
	}
	
// 	public function AuthenticatePlayer( ColoreRequestHelper &$cro ) {
// 		// Import request properties
// 		$request_properties = $cro->getRequestProperties();
		
// 		// Check input
// 		if( ! isset( $request_properties['player_name'] ) || ! isset( $request_properties['timestamp'] ) || ! isset( $request_properties['hash'] ) )
// 			return array();

// 		if( ! $cro->getRequestProperty( ' player_name' ) )
// 			return array();
		
// 		$player_query = array(
// 			'action' => 'select',
// 			'table' => 'players',
// 			'fields' => array(
// 					'*'
// 			),
// 			'criteria' => array(
// 			),
// 		);

// 		$cro->setRenderProperty( 'active', true );
// 	}
	
	public function GetPlayerState( ColoreRequestHelper &$cro ) {
		// Import request properties
		$request_properties = $cro->getRequestProperties();
		
		// Check input
		if( ! isset( $request_properties['player_name'] ) || ! isset( $request_properties['timestamp'] ) || ! isset( $request_properties['hash'] ) )
			return array();

		if( ! $cro->getRequestProperty( ' player_name' ) )
			return array();

		
		$player_query = array(
			'action' => 'select',
			'table' => 'players',
			'fields' => array(
					'*'
			),
			'criteria' => array(
			),
		);

		$cro->setRenderProperty( 'active', true );
	}
	
}

?>
