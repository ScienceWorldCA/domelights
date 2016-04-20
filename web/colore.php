<?php

/**
 * Define debug and LOGLEVEL.
 */
define( 'DEBUG', true );
define( 'LOGLEVEL', LOG_INFO );

define( 'BASEDIR', realpath( dirname( __FILE__ ) ) );

/**
 * If $config (array) does not exist, create it.
 */
if( ! isset( $config ) || ! is_array( $config ) )
	$config = array();

/**
 * Set up the array holding directories with code and configurables.
 */ 
$init_dirs = array();
$init_dirs[] = "etc";
$init_dirs[] = "interfaces";
$init_dirs[] = "core";
$init_dirs[] = "code";
$init_dirs[] = "extensions";
$init_dirs[] = "helpers";
$init_dirs[] = "renderers";

/**
 * Iterate over the array.
 */
while( list( , $init_dir ) = each( $init_dirs ) ) {
	/**
	 * Open the init_dir.
	 */
	if( $dh = @opendir( $init_dir ) ) {
		/**
		 * Iterate over the files.
		 */
		while( ( $file = readdir( $dh ) ) !== false ) {
			/**
			 * If we find a PHP file, then construct the path and require_once it.
			 */
			if( preg_match( '/.*\.php$/', $file ) ) {
				$required_file = sprintf( "%s/%s", $init_dir, $file );
				if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: Loading %s", basename( __FILE__ ), $required_file ) );
				require_once( $required_file );
			}
		}
		/**
		 * Close the directory handle.
		 */
		closedir( $dh );
	} else {
		error_log( sprintf( "%s: Failed to open init_dir: [%s]", basename( __FILE__ ), $init_dir ) );
		die( "Fatal error in init_dirs" );
	}
}

/**
 * Load custom code that needs to be initialized manually.
 */
require_once( 'custom/init.php' );

/**
 * Create a new ColoreEngine instance.
 */
if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", basename( __FILE__ ), "Instancing ColoreEngine object" ) );
$colore = new ColoreEngine( $config['colore'] );

/**
 * Service (handle) the (new) request.
 */
if( LOGLEVEL & LOG_DEBUG ) error_log( sprintf( "%s: %s", basename( __FILE__ ), "Servicing request" ) );
$colore->Service();

?>
