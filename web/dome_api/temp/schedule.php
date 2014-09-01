v0.14
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
			return date ( "Y-m-d H:i:s", time() - 60 ) ; // Remove one min. 
		} else {
			$row = mysql_fetch_assoc( $result ) ;
			return $row['end'] ;
		}
	}

	/**
	 * Returns: 
	 * 		false - if there is no black out period at this time. 
	 *      value - returns the schedule occuring at this time. 
	 */ 
	private function CheckForBlackOutPeriod( $startTime ) {
		$sql_query = "SELECT * FROM events
		WHERE TIMESTAMP( '". $startTime ."' ) BETWEEN events.start AND events.end "; 
		
		$result = mysql_query( $sql_query, $this->db );
		if( mysql_num_rows($result) > 0 ) {
			// There is a schedual at this time. We need to fine another time to run the animation. 
			return mysql_fetch_assoc( $result ); 
		}

		return true; 
	}

	/**
	 * Check to see if this time is in a schedule period. If not find the next schedule that works. 
	 * Return 
	 *		true - This time exists in a schedule period 
	 *      false - There are NO schedules. This means that the database is probably empty. 
	 *      value - The suggested start time does not exist in a schedule period. This is the next 
	 *              schedule that might work. 
	 */ 
	private function CheckForSchedulePeriod( $startTime ) 
	{

		// 2a) Find the schedule that fits one min past this time. 
		// -----------------------------------------------------------
		

		$sql_query = "SELECT * FROM `schedule` WHERE 
		TIME( TIMESTAMP( '". $startTime ."' ) ) > schedule.start
		AND TIME( TIMESTAMP( '". $startTime ."' ) ) < schedule.end
		AND schedule.type =1
		AND schedule.day >= dayofweek( TIMESTAMP( '". $startTime ."' ) ) 
		ORDER BY  `schedule`.`day` ASC 
		LIMIT 1 ";

		echo $sql_query . "\n"; 
		$result = mysql_query( $sql_query, $this->db );
		if( mysql_num_rows($result) > 0 ) {
			return true ; // This is a good time 
		} else 
			echo "FYI. No schedule at this current time. Find the next avaliable schedule. \n";
			// No schedule at the current time of day. 
			// Search the next avaliable schedule. 

			// Date of the week
			// ------------------------
			// PHP: 0 (for Sunday) through 6 (for Saturday) 
			// MySQL: Returns the weekday index for date (1 = Sunday, 2 = Monday, …, 7 = Saturday). These index values correspond to the ODBC standard.
			$dayOfTheWeek = date( 'w', strtotime( $startTime ) ) ; 
			$dayOfTheWeek ++ ; // To change it from PHP version of the day of the week to MySQL version of day of the week. 
			$dayOfTheWeek ++ ; // Add one day to find the next schedule for the next day
			if( $dayOfTheWeek > 7) {
				$dayOfTheWeek = 1 ; // Loop around from Saturday to Sunday. 
			}


			$sql_query = "SELECT * FROM schedule WHERE 
			schedule.day >= ". $dayOfTheWeek ." AND 
			schedule.type = 1 
			ORDER BY schedule.day ASC 
			LIMIT 1 ";
			echo $sql_query . "\n"; 

			$result = mysql_query( $sql_query, $this->db );
			if( mysql_num_rows($result) <= 0 ) {				
				echo 'Error: Are there any schedules at all ?' ; 
				return false;
			}
			
			return mysql_fetch_assoc( $result );
	}


	public function UpdateAnimationScheduleTime( $id, $timeOfAnimation = NULL ) {
		if( $id == NULL ) {
			// Error, Invalid USER ID 
			echo "Error: Invalid ID prameter";  
			return false; 
		}

		if( $timeOfAnimation == NULL ) {
			$timeOfAnimation = 60 ; // Default of 1 mins 
		}

		// Get the last animation and add 60 secs to it. 
		$timeOfLastScheduledAnimation = strtotime( $this->GetTimeOfLastScheduledAnimation() ) + 60 ; 
		echo 'Last schedule animation time: '. $timeOfLastScheduledAnimation ) . "\n"; 


		$scheduleTimeStart = $timeOfLastScheduledAnimation  ; 
		for( $attemps = 3 ; $attemps > 0 ; $attemps-- ) 
		{

			// We have a time that we need to test to see if it will work with the schedule and the black out events 
			$blackOutScheduleCheck = $this->CheckForBlackOutPeriod( $scheduleTimeStart ) ; 
			if( $blackOutScheduleCheck != true ) {
				// There is a black out schedule for this time. We can't use this time. 
				// Set the time for 1 mins past the current black out period then test the schedule 
				$scheduleTimeStart = $blackOutScheduleCheck[ 'end' ] ; 
				$schedulePeriod    = false ; // We changed the time. We have to recheck the schedule. 
			} 

			$schedulePeriodCheck = $this->CheckForSchedulePeriod( $scheduleTimeStart ) ; 
			if( $schedulePeriodCheck != true ) {
				$scheduleTimeStart = date( "Y-m-d H:i:s", $schedulePeriodCheck['start'] ) ; 
				echo 'scheduleTimeStart: '. $scheduleTimeStart . "\n"; 
				$blackOutScheduleCheck  = false ; 
			}


			if( $blackOutScheduleCheck === true && $schedulePeriodCheck === true ) {
				break; // We found a good one. 
			}

			echo "We need to recheck.\n";
		}

		// Update the time. 
		$scheduleTimeEnd = date( "Y-m-d H:i:s", strtotime( $scheduleTimeStart ) + $timeOfAnimation ) ;

		$sql_query = "UPDATE animations SET start = '". $scheduleTimeStart ."', end = '". $scheduleTimeEnd ."' WHERE animations.id =3;"; 
		$result = mysql_query( $sql_query, $this->db );
		if( $result == NULL ) {
			return false ;
		}

		return true ; 
	}





	public function RunTest() {
		echo '<pre>'; 


		echo '<h3>Check to see what the next animation is</h3>';
		$nextScheduleAnimation = $this->GetNextScheduleAnimation() ; 
		var_dump ( $nextScheduleAnimation ) ;
		echo "\n\n\n" ; 


		echo '<h3>Insert a new animations</h3>';
		$ret = $this->UpdateAnimationScheduleTime( 3 ) ; 
		var_dump ( $ret ) ;
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