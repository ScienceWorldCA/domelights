	<ul>
		<li><a href="?act=view&table=events">Events</a></li>
		<li><a href="?act=view&table=schedule">Schedule</a></li>
		<li><a href="?act=view&table=animations">Animations</a></li>
		<li><a href="?act=view&table=users">Users</a></li>
	</ul>

	<?php 	
	include( 'CHtmlTable.php') ; 

	// Evernts 
	// ------------------------------------------------------------------------
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

	// animations 
	// ------------------------------------------------------------------------
	class CAnimationsDisplay extends CHtmlTable 
	{
		public function DisplayTitle( $colName ) {
			switch( $colName ) {
				case 'source': 
				case 'data': 
				case 'token': {
					// Disable do not show. 
					return ''; 
				}
				default: {
					return parent::DisplayTitle( $colName ); 
				}
			}
		}

		public function DisplayInput( $colName, $value="" ) {
			switch( $colName ) {
				case 'id': {
					return $value ; // Read only 
				}
				default: {
					return parent::DisplayInput( $colName, $value ); 
				}
			}
		}

		public function DisplayValue( $colName, $value ) {
			switch( $colName ) {
				case 'user_id': {
					return '<a href="?act=edit&table=users&id='. $value . '">'. $value .'</a>' ;
				}
				default: {
					return parent::DisplayValue(  $colName, $value ); 
				}
			}
		}		
	} 






	$avaliableTables = array('events', "schedule", "animations", 'users' );
	if( ! isset( $_REQUEST['table'] ) || ! in_array($_REQUEST['table'], $avaliableTables) ) {
		echo 'Error: table not allowed, table name='. $_REQUEST['table'] ; 
		exit(); 
	}

	switch( $_REQUEST['table'] ) 
	{
		case 'events': {
			$display = new CEventsDisplay(); 
			break;
		}
		case 'animations': {
			$display = new CAnimationsDisplay(); 
			break;
		}
		default: {
			$display = new CHtmlTable(); 
			break;
		}

	}
	$display->Render( $_REQUEST );
?>
