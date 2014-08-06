<?php

class ColoreJSONContextHelper implements ColoreContextHelper {

	public function getContext( $contextName ) {
		/**
		 * We generate the filename using basename to strip off any unwanted directory insertions, the finally escape special characters. 
		 */
		$jsonFile = addslashes( basename( sprintf( "%s.json", $contextName ) ) );
		$contextFile = sprintf( "%s/contexts/json/%s", BASEDIR, $jsonFile );

		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Trying for context [%s]", __METHOD__, $contextName ) );
		
		/**
		 * Try the file and revert to the default file if needed.
		 */
		if( empty( $contextName ) || ! file_exists( $contextFile ) || ! file_get_contents( $contextFile ) )
			$contextFile = sprintf( "%s/contexts/json/%s", BASEDIR, "default.json" );
		
		/**
		 * Open and decode the file, and then return it.
		 */
		if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Returning contextFile: [%s]", __METHOD__, $contextFile ) );
		$context = json_decode( file_get_contents( $contextFile ), true );
		
		var_dump( $context );
		
	}
	
}

?>
