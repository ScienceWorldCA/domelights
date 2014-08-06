<?php

class Render_Smarty implements ColoreRenderHelper {

	public function Dispatch( ColoreRequestHelper &$cro ) {
		/**
		 * Create new Smarty object
		 */
		$smarty = new Smarty();

		/**
		 * Get the template file from the assigned render path.
		 */
		$template = $cro->getRenderPath();

		/**
		 * Clear all of the assigned variables.
		 */
		$smarty->clearAllAssign();

		/**
		 * Get all of the render properties.
		 */
		$renderProperties = $cro->getRenderProperties();

		if( LOGLEVEL & LOG_DEBUG ) @error_log( sprintf( "%s: Setting render properties [%d]", __METHOD__, count( $renderProperties ) ) );

		/**
		 * Iterate over all the render properties and assign them to the Smarty instance.
		 */
		while( list( $propName, $propVal ) = each( $renderProperties ) ) {
			if( LOGLEVEL & LOG_DEBUG ) @error_log( sprintf( "%s: Setting render property [%s] to [%s]", __METHOD__, $propName, $propVal ) );
			$smarty->assign( $propName, $propVal );
		}

		/**
		 * Render (display) the result.
		 */
		$smarty->display( $template );
	}

}
?>
