<?php 

// Connnect to the database 
include( '../etc/config.php' );



class CHtmlTable
{

	function __construct() 
	{
		global $config ; 

		// Create connection
		$this->db = mysql_connect( $config['db']['host'], $config['db']['user'], $config['db']['pass']);
		mysql_select_db($config['db']['name'], $this->db);

		// ToDo: check to see if we failed to connect to the database 
	} 

	public function DisplayValue( $colName, $value ) {
		return $value ; 
	}

	public function Display( $settings )
	{

		if( ! isset( $settings['table'] ) ) {
			echo "Error: Missing table prameter"; 
			exit(); 
		}
		echp '<h1>Table: '. $settings['table'] .'</h1>' ;

		
		$sql_query = 'SELECT * FROM '. $settings['table'] .' LIMIT 0 , 30 '; 

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
			echo '<td><a href="?act=delete&table='. $settings['table'] .'&id='. $row['id'] .'">Delete</a></td>';
			foreach( $row  as $key=>$value ) {
				echo '<td>'. $this->DisplayValue( $key, $value ) .'</td>' ; 
			}
			echo '</tr>';
		}
		echo '</table><br >';

		echo '<a href="?act=insert&table='. $settings['table'] .'">Insert new</a><br >';
	}
	
}

?>