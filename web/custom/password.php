<?php

if( ! function_exists( 'password_hash' ) ) {

	function password_hash( $password, $bogus_algo = null, $bogus_options = null ) {
		return legacy_password_hash( $password );
	}

	function password_verify( $password, $hash ) {
		return legacy_password_verify( $password, $hash );
	}

}

function legacy_password_hash( $password, $bogus_algo = null, $bogus_options = null ) {
	return hash( "sha256", $password );
}

function legacy_password_verify( $password, $hash ) {
	if( legacy_password_hash( $password ) == $hash )
		return true;
	
	return false;
}
	

?>