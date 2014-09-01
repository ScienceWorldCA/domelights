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


	public function Display( $table )
	{
		$sql_query = 'SELECT * FROM '. $table .' LIMIT 0 , 30 '; 

		echo $sql_query . "\n"; 
		$result = mysql_query( $sql_query, $this->db );		
		if( $result == NULL ) {
			echo "Nothing to show you!"; 
			return ; 
		}		
		

		echo '<table width="100%" border="1">';
		while( $row = mysql_fetch_assoc( $result ) ) {
			echo '<tr>';
			foreach( $row  as $key=>$value ) {
				echo '<td>'. $value . '</td>' ; 
			}
			echo '</tr>';
		}
		echo '</table>';
	}
	
}

?>