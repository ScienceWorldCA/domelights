<?php

class Render_Simple implements ColoreRenderHelper {

	private $_defaults = array();

	public function Dispatch( ColoreRequestHelper &$cro ) {
		$template = $cro->getRenderPath();
		$template_file = sprintf( "%s/templates/%s", BASEDIR, $template );

		$renderProperties = $cro->getRenderProperties();
		
		// Hold the variable in the template variable.
		$template = array();
		
		if( LOGLEVEL & LOG_DEBUG )
			@error_log( sprintf( "%s: Setting render properties [%d]", __METHOD__, count( $renderProperties ) ) );
		while( list( $propName, $propVal ) = each( $renderProperties ) ) {
			if( LOGLEVEL & LOG_DEBUG )
				@error_log( sprintf( "%s: Setting render property [%s] to [%s]", __METHOD__, $propName, $propVal ) );
			$template[$propName] = $propVal;
		}
		
		$template['context'] = $cro->getContext();

		require_once( $template_file );
	}

}

?>
