<?php

/**
 * The DomePlayer class controls the DomePlayer daemon
 */
class DomePlayer {

	private $dbconn;

	public function __construct() {
		$this->dbconn = ColoreDBConnector::getInstance();
	}
	
	public function GetPlayerState( ColoreRequestHelper &$cro ) {
		$player_query = array(
			'action' => 'select',
			'table' => 'players',
			'fields' => array(
			),
			'criteria' => array(
			),
		);

		$cro->setRenderProperty( 'active', true );
	}
	
}

?>
