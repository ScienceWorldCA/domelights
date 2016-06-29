<?php

// Update include path to include current path
set_include_path( get_include_path() . PATH_SEPARATOR . dirname ( __FILE__ ) );

/*
 * Include custom classes/files here.
 */

// Include functions.php
include_once( 'functions.php' );

// Include genpassword.php
include_once( 'genpassword.php' );

// Include MySQLUTCTimestamp.php
include_once( 'MySQLUTCTimestamp.php' );

// Include password.php
include_once( 'password.php' );

// Include ValidateEmail.php
include_once( 'ValidateEmail.php' );

// Include DomeSchedule.php
include_once( 'DomeSchedule.php' );

?>
