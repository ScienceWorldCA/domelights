<?php

class ColoreRequest {

	protected $_exceptionState = false;
	protected $_properties;
	protected $_settings;
	protected $_contextName = "";
	protected $_context = array();
	protected $_requestArguments = array();
	protected $_requestProperties = array();
	protected $_requestVariables = array();
	protected $_sessionProperties = array();
	protected $_renderProperties = array();

	/**
	 * Magic overload getter. Returns the requestVariable value or null.
	 * @param string $requestVariable
	 * @return mixed 
	 */
	public function __get( $requestVariable ) {
		if( array_key_exists( $requestVariable, $this->_requestVariables ) )
			return $this->_requestVariables[$requestVariable];

		return null;
	}

	/**
	 * Magic overload setter
	 * @param string $requestVariable
	 * @param string $requestValue
	 */
	public function __set( $requestVariable, $requestValue ) {
		$this->_requestVariables[$requestVariable] = $requestValue;
	}
	
	/**
	 * Magic overload checker to determine if the variable is set.
	 * @param unknown $requestVariable
	 * @return boolean
	 */
	public function __isset( $requestVariable ) {
		return array_key_exists( $requestVariable, $this->_requestVariables );
	}
	
	/**
	 * Magical unsetter for request variables.
	 * @param unknown $requestVariable
	 */
	public function __unset( $requestVariable ) {
		unset( $this->_requestVariables[$requestVariable] );
	}
	
	/**
	 * Returns an array containing all of the request arguments.
	 * @return array
	 */
	public function getRequestArguments() {
		return $this->_requestArguments;
	}

	/**
	 * Get a specific request argument. Returns null if the specified request argument does not exist.
	 * @param string $requestArgumentName
	 * @return multitype:|NULL
	 */
	public function getRequestArgument( $requestArgumentName ) {
		if( isset( $this->_requestArguments[$requestArgumentName] ) )
			return $this->_requestArguments[$requestArgumentName];

		return null;
	}

	/**
	 * Sets a request argument.
	 * @param string $requestArgument
	 * @param mixed $requestArgumentValue
	 */
	public function setRequestArgument( $requestArgument, $requestArgumentValue ) {
		$this->_requestArguments[$requestArgument] = $requestArgumentValue;
	}

	/**
	 * Returns an array containing all of the request properties.
	 * @return array
	 */
	public function getRequestProperties() {
		return $this->_requestProperties;
	}

	/**
	 * Get a specific request property. Returns null if the specified request property does not exist.
	 * @param string $requestProperty
	 * @return multitype:|NULL
	 */
	public function getRequestProperty( $requestProperty ) {
		if( isset( $this->_requestProperties[$requestProperty] ) )
			return $this->_requestProperties[$requestProperty];

		return null;
	}

	/**
	 * Sets a request property.
	 * @param string $requestProperty
	 * @param string $requestValue
	 */
	public function setRequestProperty( $requestProperty, $requestValue ) {
		$this->_requestProperties[$requestProperty] = $requestValue;
	}

	/**
	 * Get the context's rendering properties.
	 * @return array Returns an array with all the rendering properties.
	 */
	public function getContextRenderProperties() {
		return $this->_context['render']['properties'];
	}
	
	/**
	 * Gets an array containing all of the rendering properties.
	 * @return array
	 */
	public function getRenderProperties() {
		return $this->_renderProperties;
	}

	/**
	 * Get a (named) render property. Returns null or the render property if it exists.
	 * @param string $renderProperty
	 * @return multitype:|NULL 
	 */
	public function getRenderProperty( $renderProperty ) {
		if( isset( $this->_renderProperties[$renderProperty] ) )
			return $this->_renderProperties[$renderProperty];

		return null;
	}

	/**
	 * Set a render property
	 * @param string $renderProperty
	 * @param mixed $renderValue
	 */
	public function setRenderProperty( $renderProperty, $renderValue ) {
		if( LOGLEVEL & LOG_DEBUG ) @error_log( sprintf( "%s: Set [%s] to [%s]", __METHOD__, $renderProperty, $renderValue ) );
		$this->_renderProperties[$renderProperty] = $renderValue;
	}

	/**
	 * Returns an array containing all of the session properties. 
	 * @return array
	 */
	public function getSessionProperties() {
		return $_sessionProperties;
	}

	/**
	 * Get a (named) session property. Returns null or the session property if it exists.
	 * @param unknown $sessionProperty
	 * @return multitype:|NULL
	 */
	public function getSessionProperty( $sessionProperty ) {
		if( isset( $_sessionProperties[$sessionProperty] ) )
			return $_sessionProperties[$sessionProperty];

		return null;
	}

	/**
	 * Sets a session property.
	 * @param string $sessionProperty
	 * @param mixed $sessionValue
	 */
	public function setSessionProperty( $sessionProperty, $sessionValue ) {
		$_sessionProperties[$sessionProperty] = $sessionValue;
	}

	/**
	 * Sets a session property.
	 * @param string $sessionProperty
	 */
	public function unsetSessionProperty( $sessionProperty ) {
		if( isset( $_sessionProperties[$sessionProperty] ) )
			unset( $_sessionProperties[$sessionProperty] );
	}

	/**
	 * Get the name of the current context
	 * @return Returns the current context name 
	 */
	public function getContextName() {
		return $this->_contextName;
	}
	
	/**
	 * 
	 * @param array $contextData
	 */
	public function loadContext( $contextData ) {
		// Save context name
		$this->_contextName = $contextData['name'];

		// Load context information
		$this->_context = $contextData;
		
		$this->_exceptionState = false;
		
		if( isset( $this->_context['render']['properties'] ) && is_array( $this->_context['render']['properties'] ) ) {
			if( LOGLEVEL & LOG_DEBUG )
				error_log( sprintf( "%s: %s", __METHOD__, "We have render arguments" ) );
			reset( $this->_context['render']['properties'] );
			while( list( $renderProperty, $renderValue ) = each( $this->_context['render']['properties'] ) ) {
				if( LOGLEVEL & LOG_DEBUG )
					@error_log( sprintf( "%s: Set [%s] to [%s]", __METHOD__, $renderProperty, (string) $renderValue ) );
				$this->setRenderProperty( $renderProperty, $renderValue );
			}
			reset( $this->_context['render']['properties'] );
		} else {
			if( LOGLEVEL & LOG_DEBUG )
				error_log( sprintf( "%s: %s", __METHOD__, "No render arguments" ) );
		}
	}

	public function hasException() {
		return $this->_exceptionState;
	}

	public function doException() {
		$this->_exceptionState = true;
	}

	/**
	 * Get all the logic for the request.
	 * @return array Returns an array
	 */
	public function getLogic() {
		if( ! isset( $this->_context['logic'] ) || ! is_array( $this->_context['logic'] ) )
			return array();

		return $this->_context['logic'];
	}

	/**
	 * Gets the next Logic element from the stack.
	 * @return mixed Logic element
	 */
	public function getNextLogic() {
		// If we have a non-empty preempt_logic list, merge it into the logic list
		if( isset( $this->_context['preempt_logic'] ) && count( $this->_context['preempt_logic'] ) ) {
			while( count( $this->_context['preempt_logic'] ) ) {
				array_unshift( $this->_context['logic'], array_pop( $this->_context['preempt_logic'] ) );
			}
		}
		
		// Return the next logic call from the stack
		if( count( $this->_context['logic'] ) > 0 )
			return array_shift( $this->_context['logic'] );
		return false;
	}
	
	/**
	 * Append logic to the worklist
	 * @param array Logic
	 */
	public function appendLogic( array $logic ) {
		$this->_context['logic'][] = $logic;
	}
	
	/**
	 * Insert logic to the worklist
	 * @param array Logic
	 */
	public function insertLogic( array $logic ) {
		// Check for preempt list
		if( ! isset( $this->_context['preempt_logic'] ) || ! is_array( $this->_context['preempt_logic'] ) )
			$this->_context['preempt_logic'] = array();
		
		// Add logic to preempt list
		if( isset( $logic['class'] ) && isset( $logic['method'] ) )
			array_push( $this->_context['preempt_logic'], $logic );
	}

	/**
	 * Get the rendering engine for the current request.
	 * @return string Returns a string with the currently set rendering engine.
	 */
	public function getRenderEngine() {
		return $this->_context['render']['engine'];
	}

	/**
	 * Set the rendering engine for the current request.
	 * @param string $renderEngine
	 */
	public function setRenderEngine( $renderEngine ) {
		$this->_context['render']['engine'] = $renderEngine;
	}

	/**
	 * Get rendering path.
	 * @return string Returns the render path if set, else returns false. 
	 */
	public function getRenderPath() {
		if( isset( $this->_context['render']['path'] ) )
			return $this->_context['render']['path'];
		return false;
	}

	/**
	 * Sets the render path
	 * @param string $renderPath
	 */
	public function setRenderPath( $renderPath ) {
		$this->_context['render']['path'] = $renderPath;
	}

}

?>
