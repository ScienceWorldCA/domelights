<?php

function MySQLUTCTimestamp( $offset = 0 ) {
	return date( 'Y-m-d H:i:s', time()+$offset );
}

?>