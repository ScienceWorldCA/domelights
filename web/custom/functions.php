<?php

function dump( $var ) {
	header( "Content-Type: text/plain" ); var_dump( $var ); die();
}

?>