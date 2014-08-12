<?php

class ColoreApachePHPRequestHelper extends ColoreRequest implements ColoreRequestHelper {
	
	public function __construct() {
		session_start();
	}

	public function getContext() {
		$baseURL = dirname( $_SERVER['SCRIPT_NAME'] );

		if( isset( $_SERVER['PATH_INFO'] ) && ! empty( $_SERVER['PATH_INFO'] ) ) {
			$context = $_SERVER['PATH_INFO'];
		} elseif( isset( $_SERVER['REDIRECT_URL'] ) && ! empty( $_SERVER['REDIRECT_URL'] ) ) {
			$context = str_replace( $baseURL, '', $_SERVER['REDIRECT_URL'] );
		} else {
			$context = str_replace( $baseURL, '', $_SERVER['REQUEST_URI'] );
		}

		$context = addslashes( $context );
		
		if( substr( $context, 0, 1 ) == '/' )
			$context = substr( $context, 1 );

		return $context;
	}

	/**
	 * Returns an array containing all of the request arguments.
	 * @return array
	 */
	public function getRequestArguments() {
		return $_GET;
	}
	
	/**
	 * Get a specific request argument. Returns null if the specified request argument does not exist.
	 * @param string $requestArgumentName
	 * @return multitype:|NULL
	 */
	public function getRequestArgument( $requestArgumentName ) {
		if( isset( $_GET[$requestArgumentName] ) )
			return $_GET[$requestArgumentName];
	
		return null;
	}
	
	/**
	 * Sets a request argument.
	 * @param string $requestArgument
	 * @param mixed $requestArgumentValue
	 */
	public function setRequestArgument( $requestArgument, $requestArgumentValue ) {
		/**
		 * We don't want to inject data into the _GET variable.
		 */
	}

	/**
	 * Returns an array containing all of the request properties.
	 * @return array
	 */
	public function getRequestProperties() {
		return $_POST;
	}
	
	/**
	 * Get a specific request property. Returns null if the specified request property does not exist.
	 * @param string $requestProperty
	 * @return multitype:|NULL
	 */
	public function getRequestProperty( $requestProperty ) {
		if( isset( $_POST[$requestProperty] ) )
			return $_POST[$requestProperty];
	
		return null;
	}
	
	/**
	 * Sets a request property.
	 * @param string $requestProperty
	 * @param mixed $requestValue
	 */
	public function setRequestProperty( $requestProperty, $requestValue ) {
		/**
		 * We don't want to inject data into the _POST variable.
		 */
	}

	/**
	 * Returns an array containing all of the session properties.
	 * @return array
	 */
	public function getSessionProperties() {
		return $_SESSION;
	}
	
	/**
	 * Get a (named) session property. Returns null or the session property if it exists.
	 * @param unknown $sessionProperty
	 * @return multitype:|NULL
	 */
	public function getSessionProperty( $sessionProperty ) {
		if( isset( $_SESSION[$sessionProperty] ) )
			return $_SESSION[$sessionProperty];
	
		return null;
	}
	
	/**
	 * Sets a session property.
	 * @param string $sessionProperty
	 * @param mixed $sessionValue
	 */
	public function setSessionProperty( $sessionProperty, $sessionValue ) {
		$_SESSION[$sessionProperty] = $sessionValue;
	}
	
	/**
	 * Sets a session property.
	 * @param string $sessionProperty
	 */
	public function unsetSessionProperty( $sessionProperty ) {
		if( isset( $_SESSION[$sessionProperty] ) )
			unset( $_SESSION[$sessionProperty] );
	}
	
}

?>
