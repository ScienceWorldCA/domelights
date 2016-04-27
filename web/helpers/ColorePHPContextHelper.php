<?php

class ColorePHPContextHelper implements ColoreContextHelper {

	public function getContext( $requested_context ) {
		global $config;
		
		// Set up an array to hold the results
		$lookup_results = array();
		$lookup_result = "";
		
		// Reset the internal pointer for contexts
		reset( $config['contexts'] );
		
		// Loop over the contexts and save the matches
		while( list( $context_handle, ) = each( $config['contexts'] ) ) {
			// If the context_handle is small enough to match the requested_context, the context_handle matches the requested_context and the match is longer than the saved lookup_result, then save it
			if( ( strlen( $context_handle ) <= strlen( $requested_context ) ) && ( substr( $requested_context, 0, strlen( $context_handle ) ) == $context_handle ) && strlen( $context_handle ) > strlen( $lookup_result ) )
				$lookup_result = $context_handle; 
		}
		
		// Reset the internal pointer for contexts
		reset( $config['contexts'] );
		
		// Check if lookup_result returns a valid context, else fall back to 'default'
		if( ! isset( $config['contexts'][$lookup_result] ) || ! is_array( $config['contexts'][$lookup_result] ) )
			$lookup_result = 'default';
		
		// Return the right context
		return $config['contexts'][$lookup_result];
	}
	
}

?>