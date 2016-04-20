<?php

class Render_Redirect implements ColoreRenderHelper {

	public function Dispatch( ColoreRequestHelper &$cro ) {

		// Get the redirect path
		$redirectPath = $cro->getRenderPath();
		if( LOGLEVEL & LOG_DEBUG )
			error_log( sprintf( "%s: redirectPath: [%s]", __METHOD__, $redirectPath ) );
		
		// If not fully qualified URL, then prepend baseURL
		if( ! filter_var( $redirectPath, FILTER_VALIDATE_URL ) ) {
			// If the baseURL ends in a slash, strip the preceding '/' from the redirect path 
			if( substr( $cro->getRenderProperty( 'baseURL' ), -1, 1 ) == '/' )
				$redirectPath = str_replace( '/', '', $redirectPath );
			
			if( LOGLEVEL & LOG_DEBUG )
				error_log( sprintf( "%s: redirectPath: [%s]", __METHOD__, $redirectPath ) );
			
			// Combine the baseURL and redirect path into the redirect URL
			$redirectURL = sprintf( "%s%s", $cro->getRenderProperty( 'baseURL' ), $redirectPath );
			if( LOGLEVEL & LOG_DEBUG ) {
				error_log( sprintf( "%s: baseURL: [%s]", __METHOD__, $cro->getRenderProperty( 'baseURL' ) ) );
				error_log( sprintf( "%s: redirectURL: [%s]", __METHOD__, $redirectURL ) );
			}
		} else {
			// If we have a full URL, then set redirectURL from redirectPath
			$redirectURL = $redirectPath;
		}

		// Construct header line
		$headerLine = sprintf( "Location: %s", $redirectURL );

		// Log header line
		if( LOGLEVEL & LOG_DEBUG )
			error_log( sprintf( "%s: Redirecting to: [%s]", __METHOD__, $headerLine ) );
		
		// Send http header
		header( $headerLine );
	}

}

?>
