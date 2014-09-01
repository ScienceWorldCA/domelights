v0.9
<?php 
// Connnect to the database 
include( '../etc/config.php' );


class CSchedule
{
	private $db ; 
	function __construct() 
	{
		global $config ; 

		// Create connection
		$this->db = mysql_connect( $config['db']['host'], $config['db']['user'], $config['db']['pass']);
		mysql_select_db($config['db']['name'], $this->db);

		// ToDo: check to see if we failed to connect to the database 
   } 


   	/**
   	 * Check the animation table and find the next scheduled animation. 
   	 *
   	 * Example database: 
   	 * ID | START               | END 
   	 *  1 | 2014-08-31 10:00:01 | 2014-08-31 10:00:02
   	 *  2 | 2014-08-31 10:00:02 | 2014-08-31 10:00:03
   	 *  3 | 2014-08-31 10:00:03 | 2014-08-31 10:00:04
   	 *  4 | 2014-08-31 10:00:04 | 2014-08-31 10:00:05
   	 *
   	 * Prameters
   	 * 	  start - 2014-08-25 22:31:00 ("Y-m-d H:i:s")
   	 *
   	 * Return: 
   	 *    false - No schedule Animation 
   	 *    Value - The animation. 
   	 */ 
	public function GetNextScheduleAnimation( $start = NULL) {
		
		// If no start time is set, then use the current time. 
		if( $start == NULL ) {
			$start = date ( "Y-m-d H:i:s" ) ; 
		}

		// NOTE: MySQL command BETWEEN is inclusive of the start and end timestamps. 
		$sql_query = "SELECT * 
		FROM  animations
		WHERE TIMESTAMP( '". $start ."' ) BETWEEN animations.start AND animations.end 
		LIMIT 1";

		echo $sql_query . "\n\n"; 
		$result = mysql_query( $sql_query , $this->db );
		$num_rows = mysql_num_rows($result);
		if( $num_rows <= 0 ) {
			return false ; 
		} else {
			return mysql_fetch_assoc( $result ) ; 
		}
	}

	private function GetTimeOfLastScheduledAnimation( ) {
		// 1) Find the last schedulled animation 
		$sql_query = "
		SELECT START FROM animations
		WHERE state =0 AND animations.start > CURRENT_TIMESTAMP() 
		ORDER BY animations.start DESC 
		LIMIT 1";

		echo $sql_query . "\n"; 
		$result = mysql_query( $sql_query, $this->db );
		if( mysql_num_rows($result) <= 0 ) {
			// This is not an error. This means that there is currently NO animation ahead of this animation. 
			// We need to insert this animation at the next avaliable time. 
			return date ( "Y-m-d H:i:s" ) ;
		} else {
			$row = mysql_fetch_assoc( $result ) ;
			return $row['end'] ;
		}
	}

	public function AddNewAnimation( $user_id, $data, $source ) {
		if( $user_id == NULL || $user_id <= 0 ) {
			// Error, Invalid USER ID 
			echo "Error: Invalid User ID prameter";  
			return false; 
		}

		if( $data == NULL  ) {
			// Error, Invalid USER ID 
			echo "Error: Invalid data prameter";  
			return false; 
		}

		if( $source == NULL ) {
			// Error, Invalid USER ID 
			echo "Error: Invalid source prameter";  
			return false; 
		}


		$timeOfLastScheduledAnimation = $this->GetTimeOfLastScheduledAnimation(); 
		var_dump( $timeOfLastScheduledAnimation ) ; 


		// 2a) Find the schedual that fits one min past this time. 
		$sql_query = "
		SELECT * 
		FROM `schedule` 
		WHERE TIME( TIMESTAMP( '". $timeOfLastScheduledAnimation ."' ) ) > schedule.start
		AND TIME( TIMESTAMP( '". $timeOfLastScheduledAnimation ."' ) ) < schedule.end
		AND schedule.type =1
		AND schedule.day >= dayofweek( TIMESTAMP( '". $row['end'] ."' ) ) 
		LIMIT 1 ";

		echo $sql_query . "\n"; 
		$result = mysql_query( $sql_query, $this->db );
		if( mysql_num_rows($result) > 0 ) {
			while( $row = mysql_fetch_assoc( $result ) ) {
				var_dump( $row ) ;
			}
		} else {
			// No schedule. 
			echo 'No Schedule' ; 
		}


	}





	public function RunTest() {
		echo '<pre>'; 


		echo '<h3>Check to see what the next animation is</h3>';
		$nextScheduleAnimation = $this->GetNextScheduleAnimation() ; 
		var_dump ( $nextScheduleAnimation ) ;
		echo "\n\n\n" ; 


		echo '<h3>Insert a new animations</h3>';
		$user_id 	= "1";
		$data 		= "data look at all this data";
		$source		= "This is the source that makes the data"; 
		$addedScheduleAnimation = $this->AddNewAnimation( $user_id, $data, $source ) ; 
		var_dump ( $addedScheduleAnimation ) ;
		echo "\n\n\n" ; 
		/*

		// 1) Find the last schedulled animation 
		$sql_query = "
		SELECT START FROM animations
		WHERE state =0
		ORDER BY animations.start DESC 
		LIMIT 1";

		echo $sql_query . "\n"; 
		$result = mysql_query( $sql_query, $this->db );
		$row = mysqli_fetch_array( $result ) ;
		var_dump( $row ) ;

		// 2a) Find the schedual that fits one min past this time. 
		$sql_query = "
		SELECT * 
		FROM `schedule` 
		WHERE TIME( TIMESTAMP( '". $row['end'] ."' ) ) > schedule.start
		AND TIME( TIMESTAMP( '". $row['end'] ."' ) ) < schedule.end
		AND schedule.type =1
		AND schedule.day >= dayofweek( TIMESTAMP( '". $row['end'] ."' ) ) 
		LIMIT 1 ";

		echo $sql_query . "\n"; 
		$result = mysql_query( $sql_query, $this->db );
		while( $row = mysqli_fetch_array( $result ) ) {
			var_dump( $row ) ;
		}
		*/


		echo '</pre>'; 
	} 
}


$schedule_instance = new CSchedule();
$schedule_instance->RunTest() ; 
?>