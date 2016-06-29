<?php

/*
 * Created by Tycho (Ty) Eggen, 2014.
*/

class BaseClass {

	protected $config;
	protected $dbconn;
	protected $dictionary = "123456789abcdefghijklmnoqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";

	public function __construct() {
		global $config;

		$this->config = $config;
		$this->dbconn = ColoreDBConnector::getInstance();
		$timezone_result = $this->dbconn->exec( "SET SESSION time_zone = 'UTC'" );
	}

}

?>
