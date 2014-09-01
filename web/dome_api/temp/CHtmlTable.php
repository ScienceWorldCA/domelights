<?php 

// Connnect to the database 
include( '../etc/config.php' );



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
			$this->page['act'] = 'list' ; 
		}
		$avaliableMethods = array("list", "insert", "delete" );
		if ( ! in_array($this->page['act'], $avaliableMethods) ) {
			echo 'Error: act not allowed, act='. $this->page['act'] ; 
			return ; 
		}

		switch( $this->page['act'] ) {
			case 'list':
			{
				$this->Display() ;
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

	public function DisplayValue( $colName, $value ) {
		return $value ; 
	}

	public function Display(  )
	{
		echo '<h1>Table: '. $this->page['table'] .'</h1>' ;

		$sql_query = 'SELECT * FROM '. $this->page['table'] .' ';
		if( ! isset( $this->page['limit'] ) ) {
			$this->page['limit'] = 30 ; 
		}
		if( ! isset( $this->page['offset'] ) ) {
			$this->page['offset'] = 0 ; 
		}
		$sql_query .= 'LIMIT '. $this->page['limit']  .' '. $this->page['offset'] .', '. $this->page['offset'] .' ;' ; 


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
			echo '<td><a href="?act=delete&table='. $this->page['table'] .'&id='. $row['id'] .'">Delete</a></td>';
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