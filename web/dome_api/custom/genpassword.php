<?php

// Copyright Tycho Eggen, 2007-2013
// This software is licensed under the GPLv2 license.

function genpassword( $password_length = 8, $dict = "abcdefghijklmnopqrstuvwxyz0123456789" ) {

	$dictlen = strlen( $dict );

	$password = "";

	for ( $pos = 1 ; $pos <= $password_length ; $pos++ ) {
		$symbol = substr( $dict, mt_rand( 0, ( $dictlen - 1 ) ), 1 );
		if ( mt_rand( 0, 1 ) == 1 ) {
			$symbol = strtoupper( $symbol );
		}
		$password .= $symbol;
	}

	if( (rand()&1) )
		$password = str_replace( "l", "1", $password );

	if( (rand()&1) )
		$password = str_replace( "a", "4", $password );

	if( (rand()&1) ) {
		$password = str_replace( "i", "!", $password );
	} elseif( (rand()&1) ) {
		$password = str_replace( "i", "1", $password );
	}

	if( (rand()&1) ) {
		$password = str_replace( "I", "!", $password );
	} elseif( (rand()&1) ) {
		$password = str_replace( "I", "1", $password );
	}

	if( (rand()&1) )
		$password = str_replace( "E", "3", $password );

	if( (rand()&1) )
		$password = str_replace( "T", "+", $password );

	if( (rand()&1) )
		$password = str_replace( "o", "0", $password );

	$password_tmp = "";

	for ( $c = 0 ; $c < strlen( $password ) ; $c++ ) {
		$symbol = substr( $password, $c, 1 );
		if ( ( $c / 2 ) == 1 ) {
			$symbol = strtolower( $symbol );
		}
		$password_tmp .= $symbol;
	}

	$password = $password_tmp;

	return $password;

}

?>