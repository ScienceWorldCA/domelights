<?php

/*
 * Copyright 2013, Tycho Eggen.
 *
 * ValidateEmail( <email address> )
 * @returns boolean
 *
 * Verifies an email address and checks if the domain is resolveable.
 */

function ValidateEmail( $email ) {
        // Check if address is valid
        if( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) )
                return false;

        // Break up into parts
        $parts = explode( '@', $email );
        $user = $parts[0];
        $domain = $parts[1];

        // Check if domain resolves
        if( ! checkdnsrr( $domain, 'MX' ) && ( ! checkdnsrr( $domain, 'A' ) || ! checkdnsrr( $domain, 'AAAA' ) ) )
                return false;

        return true;
}

?>