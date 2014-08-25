<?php

/**
 * The Ping class is an example class for remoting.
 */
class Ping {
	
	public function Reply( ColoreRequestHelper &$cro ) {
		if( $cro->getRequestArgument( 'message' ) )
			$cro->setRenderProperty( 'message', $cro->getRequestArgument( 'message' ) );
	}
	
}

?>