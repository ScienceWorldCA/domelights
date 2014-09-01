<?php 
	
	include( 'CHtmlTable.php') ; 
	include( '../etc/config.php' );

	$act = 'list'; 
	if( ! isset( $_REQUEST['act'] ) ) {
		$act = $_REQUEST['act'] ; 
	}


	switch( $act ) {
		default: 
		case 'list':
		{
			echo '<ul>';
			echo '<li><a href="?act=view&table=events">Events</a></li>'; 
			echo '<li><a href="?act=view&table=schedule">Schedule</a></li>'; 
			echo '<li><a href="?act=view&table=animations">Animations</a></li>'; 
			echo '</ul>';
			break ; 
		}

		case 'view':
		{
			if( ! isset( $_REQUEST['table'] ) ) {
				echo "Error: Missing table prameter"; 
				exit(); 
			}


			$avaliableTables = array("events", "schedule", "animations" );
			if ( ! in_array($_REQUEST['table'], $avaliableTables) ) {
				echo 'Error: table not allowed, table name='. $_REQUEST['table'] ; 
				exit(); 
			}

			$displayTable = CHtmlTable(); 
			$displayTable->Display( $_REQUEST['table'] );


			break ; 
		}


	}


?>