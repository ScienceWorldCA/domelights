	<ul>
		<li><a href="?act=view&table=events">Events</a></li>
		<li><a href="?act=view&table=schedule">Schedule</a></li>
		<li><a href="?act=view&table=animations">Animations</a></li>
	</ul>

	<?php 	
	include( 'CHtmlTable.php') ; 

	class CEventsDisplay extends CHtmlTable 
	{
		public function DisplayTitle( $colName ) {
			switch( $colName ) {
				case 'created': 
				case 'id': {
					// Disable do not show. 
					return ''; 
				}
				default: {
					return parent::DisplayTitle( $colName ); 
				}
			}
			return $colName ; 
		}
	} 



	$avaliableTables = array("events", "schedule", "animations" );
	if ( ! in_array($_REQUEST['table'], $avaliableTables) ) {
		echo 'Error: table not allowed, table name='. $_REQUEST['table'] ; 
		exit(); 
	}

	$eventsDisplay = new CEventsDisplay(); 
	$eventsDisplay->Render( $_REQUEST );
?>