<?php

class ColoreDBconnector {

	private static $_instance = null;
	protected $_pdo;

	protected function __construct() {
		global $config;

		// Create a new database connection
		$this->_pdo = new PDO( $config['db']['dsn'], $config['db']['user'], $config['db']['pass'], array( PDO::ATTR_PERSISTENT => true) );
		
		// Set default mode to associative
		$this->_pdo->setAttribute( PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC );
	}

	public static function getInstance() {
		global $config;

		if( self::$_instance == null ) {
			try {
				self::$_instance = new DBconnector();
			} catch( PDOException $e ) {
				error_log( sprintf( "%s: Connection failed: %s - %s ", __METHOD__, $e->getMessage(), $config['db']['dsn'] ) );
				die( "Fatal DB connection error" );
			}
		}

		return self::$_instance;
	}

	public function __clone()
	{
		return false;
	}

	public function __wakeup()
	{
		return false;
	}

	public function prepare( $statement, $opts = array() ) {
		if( LOGLEVEL & LOG_DEBUG )
			error_log( sprintf( "%s: %s", __METHOD__, $statement ) );
		return $this->_pdo->prepare( $statement, $opts );
	}

	public function exec( $statement ) {
		return $this->_pdo->exec( $statement );
	}

	public function query( $statement ) {
		return $this->_pdo->query( $statement );
	}

	public function lastInsertId( $name = null ) {
		return $this->_pdo->lastInsertId( $name );
	}

	public function mappedQuery( array $SQLmapped ) {
		if( LOGLEVEL & LOG_DEBUG )
			error_log( sprintf( "%s/%d: Running for: [%s]", __METHOD__, __LINE__, print_r( $SQLmapped, 1 ) ) );
		// generated SQL
		$generatedSQLInfo = ColoreSQLmapper::generateSQL( $SQLmapped );
		if( LOGLEVEL & LOG_DEBUG )
			error_log( sprintf( "%s/%d: Running for: [%s]", __METHOD__, __LINE__, print_r( $generatedSQLInfo, 1 ) ) );
		
		// SQL logic
		$queryHandler = $this->prepare( $generatedSQLInfo['statement'] );
		$queryResult = $queryHandler->execute( $generatedSQLInfo['arguments'] );
		
		if( $queryResult ) {
			if( LOGLEVEL & LOG_DEBUG )
				error_log( sprintf( "%s/%d: Successful query for: [%s]/[%d]", __METHOD__, __LINE__, $generatedSQLInfo['statement'], $queryHandler->rowCount() ) );
			
			if( $SQLmapped['action'] == 'select' && $queryHandler->rowCount() == 1 ) {
				return $queryHandler->fetch();
			} elseif( $SQLmapped['action'] == 'select' && $queryHandler->rowCount() > 1 ) {
				return $queryHandler->fetchAll();
			} else {
				return true;
			}
		} else {
			if( LOGLEVEL & LOG_DEBUG )
				error_log( sprintf( "%s: Error for query[%s]: [%s]", __METHOD__, print_r( $queryHandler->errorInfo(), 1 ), print_r( $generatedSQLInfo, 1 ) ) );
			return false;
		}
	}
}

?>
