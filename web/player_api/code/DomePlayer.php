<?php

/**
 * The DomePlayer class controls the DomePlayer daemon
 */
class DomePlayer {

	private $dbconn;

	public function __construct() {
		$this->dbconn = ColoreDBConnector::getInstance();
	}
	
	public function AuthenticatePlayer( ColoreRequestHelper &$cro ) {
		// Bail if authenticated
		if( $cro->getSessionProperty( 'authenticated' ) )
			return;
		
		// Set default
		$cro->setSessionProperty( 'authenticated', false );
		
		// Import request properties
		$request_properties = $cro->getRequestProperties();
		
		// Check input
		if( ! isset( $request_properties['player_name'] ) || ! isset( $request_properties['timestamp'] ) || ! isset( $request_properties['hash'] ) ) {
			$cro->setRenderProperty( 'message', 'problem' );
			$cro->setRenderProperty( 'authenticated', 'error1' );
			return false;
		}

		// Set up query
		$player_query = array(
			'action' => 'select',
			'table' => 'players',
			'fields' => array(
					'*' => true,
			),
			'criteria' => array(
					'name' => $request_properties['player_name'],
			),
		);
		
		// Execute query
		$player_info = $this->dbconn->mappedQuery( $player_query );

		// Check for valid player information
		if( ! $player_info || ! is_array( $player_info ) || ! isset( $player_info['secret'] ) ) {
			$cro->setRenderProperty( 'authenticated', false );
			$cro->setRenderProperty( 'message', 'Error in player lookup' );
			return false;
		}
		
		// Recreate the message hash
		$message_hash = hash_hmac( 'sha256', sprintf( "%s%s%s", $player_info['name'], $request_properties['timestamp'], $player_info['secret'] ), $player_info['secret'] );
		
		// Check if hash matches, else bail
		if( $message_hash != $request_properties['hash'] ) {
			$cro->setRenderProperty( 'authenticated', false );
			$cro->setRenderProperty( 'error', 'Error verifying player' );
			return false;
		}
		
		// Set session info
		$cro->setSessionProperty( 'player_info', $player_info );
		$cro->setSessionProperty( 'authenticated', true );

		// Set render info
		$cro->setRenderProperty( 'authenticated', true );
	}
	
	public function GetPlayerState( ColoreRequestHelper &$cro ) {
		$player_info = $cro->getSessionProperty( 'player_info' );
		
		// Set up query
		$player_state_query = array(
				'action' => 'select',
				'table' => 'players',
				'fields' => array(
						'enabled' => true,
				),
				'criteria' => array(
						'id' => $player_info['id'],
				),
		);
		
		// Execute query
		$player_state_result = $this->dbconn->mappedQuery( $player_state_query );
		
		// Check result, bail on fail
		if( ! is_array( $player_state_result ) || ! isset( $player_state_result['enabled'] ) ) {
			$cro->setRenderProperty( 'error', 'Error looking up player state' );
			return false;
		}
		
		// Set player_active variable
		$player_active = $player_state_result['enabled'] ? true : false;
		
		// Set state for rendering
		$cro->setRenderProperty( 'active', $player_active );
	}

	public function getNextShow( ColoreRequestHelper &$cro ) {
		// Test
		$cro->setRenderProperty( 'hasNewShow', true );
	}
	
}

?>
