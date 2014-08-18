<?php

class ColorePHPContextHelper implements ColoreContextHelper {

	public function getContext( $contextName ) {
		global $config;
		
		if( ! isset( $config['contexts'][$contextName] ) || ! is_array( $config['contexts'][$contextName] ) )
			$contextName = 'default';
		
		return $config['contexts'][$contextName];
	}
	
}

?>
