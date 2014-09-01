<?php 

// Connnect to the database 
include( '../etc/config.php' );


//CRUD
class CHtmlTable
{
	public $page ; 

	function __construct() 
	{
		global $config ; 

		// Create connection
		$this->db = mysql_connect( $config['db']['host'], $config['db']['user'], $config['db']['pass']);
		mysql_select_db($config['db']['name'], $this->db);

		// ToDo: check to see if we failed to connect to the database 
	} 

	public function Render( $prameters ) {
		$this->page = $prameters  ; 

		if( ! isset( $this->page['table'] ) ) {
			echo "Error: Missing table prameter"; 
			return ;
		}


		if( ! isset( $this->page['act'] ) ) {
			$this->page['act'] = 'view' ; 
		}
		$avaliableMethods = array('create', 'view', 'edit', 'delete', 'insert' );
		if ( ! in_array($this->page['act'], $avaliableMethods) ) {
			echo 'Error: act not allowed, act='. $this->page['act'] ; 
			return ; 
		}

		switch( $this->page['act'] ) {
			case 'view':
			{
				$this->ActView() ;
				break;  
			}
			case 'delete':
			{
				$this->ActDelete() ;
				break;  
			}
			case 'create':
			{
				$this->DisplayCreate() ;
				break;  
			}			
			case 'insert':
			{
				$this->ActInsert() ;
				break;  
			}			
			default: 
			{
				echo 'ToDo: '. $this->page['act'] . "<br />\n";
				break; 
			}
		}

		// Everything looks good. 
		return true ; 
	}

	// If this returns empty value then this column will not be displayed. 
	public function DisplayTitle( $colName ) {
		return $colName ; 
	}

	public function DisplayValue( $colName, $value ) {
		return $value ; 
	}
	public function DisplayDescription( $colName ) {
		return ''; 
	}	
	public function DisplayInput( $colName ) {
		return '<input name="'. $colName  .'" type="text" />'; 
	}

	public function ActInsert() {
		echo 'ToDo: ActInsert '; 
	}

	public function DisplayCreate( ) {

		// find the table schema 
		$sql_query = 'DESCRIBE '. $this->page['table'] .' ; ';
		$result = mysql_query( $sql_query, $this->db );	

		echo '<form action="?act=insert&table='. $this->page['table'].'" method="post">';
		echo '<table border="1">' ;
		echo '<tr><th>Name</th><th>Value</th><th>Description</th></tr>'; 
		while( $row = mysql_fetch_assoc( $result ) ) {
			
			$columnTitle = $this->DisplayTitle( $row['Field'] ) ; 
			if( strlen( $columnTitle) <= 0 ) {
				continue; 
			}

			echo '<tr>';
			echo '<td>'. $columnTitle .'</td>';			
			echo '<td>'. $this->DisplayInput( $row['Field'] ) .'</td>';			
			echo '<td>'. $this->DisplayDescription( $row['Field'] ) .'</td>';
			echo '</tr>';
		}
		echo '</table>'; 
		echo '<input type="submit" />';

		echo '</form>';
	}

	public function ActDelete( ) 
	{
		if( !isset( $this->page['id'] ) ) {
			echo 'Error: Missing id prameter';
			return false ; 
		}

		$sql_query = 'DELETE FROM '. $this->page['table'] .' WHERE id='. $this->page['id'] .' ; ';
		$result = mysql_query( $sql_query, $this->db );	
		if( $result === false ) {
			echo 'Error: Could not delete row';
			return false ;
		}
		echo 'FYI: row deleted' ; 
		$this->ActView() ;
		return true ; 
	}

	public function ActView(  )
	{
		echo '<h1>Table: '. $this->page['table'] .'</h1>' ;

		$sql_query = 'SELECT * FROM '. $this->page['table'] .' ';
		if( ! isset( $this->page['limit'] ) ) {
			$this->page['limit'] = 30 ; 
		}
		if( ! isset( $this->page['offset'] ) ) {
			$this->page['offset'] = 0 ; 
		}
		$sql_query .= 'LIMIT '. $this->page['offset']  .', '. $this->page['limit'] .' ;' ; 


		echo $sql_query . "\n"; 
		$result = mysql_query( $sql_query, $this->db );		
		if( $result == NULL ) {
			echo "Nothing to show you!"; 
			return ; 
		}		
		
		$first = true ; 
		echo '<table width="100%" border="1">';
		while( $row = mysql_fetch_assoc( $result ) ) {
			if( $first ) {
				echo '<tr>';
				echo '<th>Actions</th>';
				foreach( $row  as $key=>$value ) {
					echo '<th>'. $key .'</th>' ; 
				}
				echo '</tr>';
				$first = false ; 
			}
			echo '<tr>';
			echo '<td><a onclick="return confirm(\'Are you sure you want to delete this recode?\')" href="?act=delete&table='. $this->page['table'] .'&id='. $row['id'] .'">Delete</a></td>';
			foreach( $row  as $key=>$value ) {
				echo '<td>'. $this->DisplayValue( $key, $value ) .'</td>' ; 
			}
			echo '</tr>';
		}
		echo '</table><br >';

		echo '<a href="?act=insert&table='. $this->page['table'] .'">Insert new</a><br >';
	}
	
}

?>