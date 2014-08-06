<?php

class ColoreEngine {

	/**
	 * $_objectCache holds the cached class instances as used throughout Colore. Such objects include logic and rendering engines. 
	 * @var array
	 */
	private $_objectCache = array();
	/**
	 * $_config is the internal configuration store.
	 * @var unknown
	 */
	private $_config = array();
	/**
	 * $_helpers holds instances of the helpers used to handle a request.
	 * @var unknown
	 */
	private $_helpers = array();

	/**
	 * ColoreEngine is initialized with the initial configuration.
	 * @param array $config
	 */
	public function __construct( array $config ) {
		/**
		 * If $config is an array; die on failure.
		 */
		if( ! is_array( $config ) )
			die( sprintf( "%s: Error initializing Colore configuration", __METHOD__ ) );
		
		$this->_config = $config;
	}
	
	/**
	 * Service handles new requests.
	 */
	public function Service() {
		/**
		 * Load the context helper.
		 */
		if( ! isset( $this->_helpers['context'] ) ) {
			$contextHelper = $this->Factory( $this->_config['helpers']['context'], 'ColoreContextHelper' );
	
			if( ! $contextHelper )
				$this->Fatal( "Failed to acquire context helper" );
			
			$this->_helpers['context'] = $contextHelper;
		}
		
		/**
		 * Load the request helper.
		 */
		$requestObject = $this->Factory( $this->_config['helpers']['request'], 'ColoreRequestHelper' );
		
		if( ! $requestObject )
			$this->Fatal( "Failed to acquire request helper" );
		
		/**
		 * Load default render properties into Request Object.
		 */
		$defaultRenderProperties = $this->_config['defaults']['render']['properties'];
		
		while( list( $propName, $propVal ) = each( $defaultRenderProperties ) ) {
			$requestObject->setRenderProperties( $propName, $propVal );
		}
		
		/**
		 * Dispatch the request.
		 */
		$this->Dispatch( $requestObject );
		
		/**
		 * Render the request.
		 */
		$this->Render( $requestObject );
		
	}

	/**
	 * Dispatch (handle) a request.
	 * Dispatch resolves the request context, loads the context data, imports it into the request object and executes associated logic.
	 * @param ColoreRequestHelper $cro
	 */
	public function Dispatch( ColoreRequestHelper &$cro ) {

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", __METHOD__, "Dispatching" ) );

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", __METHOD__, "Issuing context helpers" ) );

		/**
		 * Get Request Context
		 */
		$contextName = $cro->getContext();

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Resolving context: [%s]", __METHOD__, $contextName ) );
		
		$contextData = $this->_helpers['context']->getContext( $contextName );
		$contextData['name'] = $contextName;

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", __METHOD__, "Loading context into Request object..." ) );
		
		/**
		 * Load the Context into the Request object
		 */
		$cro->loadContext( $contextData );

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", __METHOD__, "Get Logic calls from the Request object..." ) );
		
		/**
		 * If $cro has no valid logic, give a fatal error
		 */ 
		if( ! is_array( $cro->getLogic() ) )
			$this->Fatal( "Dispatch/Error in getLogic result" );

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Executing Logic calls from the Request object [%d]...", __METHOD__, count( $cro->getLogic() ) ) );

		/**
		 * Iterate over request logic.
		 */
		while( $call = $cro->getNextLogic() )
		{
			/**
			 * Check if we're still clear to run
			 */
			if( $cro->hasException() )
				break;
			
			/**
			 * If getNextLogic generated an error, then bail.
			 */
			if( ! $call || ! isset( $call['class'] ) || ! isset( $call['method'] ) )
				break;

			if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Executing Logic call: [%s->%s]", __METHOD__, $call['class'], $call['method'] ) );

			/**
			 * Get a (cached) instance of the defined logic class.
			 */
			$logicObject = $this->getCachedObject( $call['class'] );

			/**
			 * Aggregate the logic properties (class and method) in callObj for execution.
			 */
			$callObj = array(
					$logicObject,
					$call['method'],
			);

			/**
			 * If the method does not exist, then bail, else execute the class method.
			 * If the class method returns false, then stop further execution (of logic).
			 */
			if( ! method_exists( $logicObject, $call['method'] ) ) {
				$cro->doException();
				$this->Fatal( "Fatal Error In Request" );
			} else {
				if( LOGLEVEL & LOG_DEBUG ) {
					$res = call_user_func( $callObj, $cro );
				} else {
					$res = @call_user_func( $callObj, $cro );
				}
	
				if( $res === false )
					$cro->doException();
	
				if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Logic Call [%s->%s] returned: [%s]", __METHOD__, $call['class'], $call['method'], (string) $res ) );
			}
		}

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", __METHOD__, "Done executing Logic calls" ) );

	}

	/**
	 * This method is responsible for rendering the request.
	 * @param ColoreRequestHelper $cro
	 */
	public function Render( ColoreRequestHelper &$cro ) {

		/**
		 * Get the render engine as set in the request.
		 */
		$renderEngine = $cro->getRenderEngine();

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Render with: [%s]", __METHOD__, $renderEngine ) );

		/**
		 * Get a (cached) instance of the render engine.
		 */
		$renderInstance = $this->getCachedObject( $renderEngine );

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", __METHOD__, "Rendering..." ) );

		/**
		 * Dispatch the render request to the rendering engine.
		 */
		$renderInstance->Dispatch( $cro );

	}

	/**
	 * Returns a cached instance of the class name type. If it does not exist, it creates an instance of the class name and saves it into the private objectCache array.
	 * @param string $className
	 * @return resource
	 */
	public function getCachedObject( $className ) {

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: getCachedObject: [%s]", __METHOD__, $className ) );

		/**
		 * Check if the class is defined.
		 */
		if( ! class_exists( $className ) )
			$this->Fatal( sprintf( "%s->%s: getCachedObject/Missing class: [%s]", __METHOD__, $className ) );

		/**
		 * If the object is not cached, create the object and save it in the cache. 
		 */
		if( ! isset( $this->_objectCache[$className] ) )
			$this->_objectCache[$className] = new $className;

		/**
		 * Check if the cached object matched the specified class name. Bail on failure.
		 */
		if( ! is_a( $this->_objectCache[$className], $className ) )
			$this->Fatal( sprintf( "%s->%s: getCachedObject/Could not instantiate class: [%s]", __METHOD__, $className ) );

		/**
		 * Return the object from the cache.
		 */
		return $this->_objectCache[$className];

	}

	/**
	 * Factorize a class by class name and confirm it matches the class interface. Returns an instance of the class name if successful.
	 * @param string $className
	 * @param string $classInterface
	 * @return resource
	 */
	public function Factory( $className, $classInterface ) {

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: [%s]", __METHOD__, $className ) );

		/**
		 * Check if the class is defined.
		 */
		if( ! class_exists( $className ) )
			$this->Fatal( sprintf( "%s: Missing class: [%s]", __METHOD__, $className ) );

		/**
		 * Create a new instance of the specified class name.
		 */
		$objectClass = new $className;

		/**
		 * If the created instance does not implement the specified class interface, then bail.
		 */
		if( ! is_a( $objectClass, $classInterface ) )
			$this->Fatal( sprintf( "%s: Class is not of interface: [%s]", __METHOD__, $classInterface ) );

		/**
		 * Return the created instance.
		 */
		return $objectClass;

	}

	/**
	 * Die not so quietly and log the error message
	 * @param string $errorMessage
	 */
	public function Fatal( $errorMessage ) {

		error_log( sprintf( "%s: %s", __METHOD__, $errorMessage ) );

		die( "A fatal error occured." );

	}

}

?>
