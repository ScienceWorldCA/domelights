	<ul>
		<li><a href="?act=view&table=events">Events</a></li>
		<li><a href="?act=view&table=schedule">Schedule</a></li>
		<li><a href="?act=view&table=animations">Animations</a></li>
	</ul>

	<?php 	
	include( 'CHtmlTable.php') ; 

	$avaliableTables = array("events", "schedule", "animations" );
	if ( ! in_array($_REQUEST['table'], $avaliableTables) ) {
		echo 'Error: table not allowed, table name='. $_REQUEST['table'] ; 
		exit(); 
	}

	$displayTable = new CHtmlTable(); 
	$displayTable->Render( $_REQUEST );
?>