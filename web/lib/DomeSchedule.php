<?php 
// Connnect to the database 
require_once( dirname( __FILE__ ) . '/../etc/config.php' );


class CSchedule
{
	private $db ;
	private $DEBUG = true;
	
	function __construct() 
	{
		global $config ; 

		// Create connection
		$this->db = mysqli_connect( $config['db']['host'], $config['db']['user'], $config['db']['pass'], $config['db']['name'] );
		
		if( ! $this->db )
			die( "Critical error connecting to database" );

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
		$sql_query = array();
		$sql_query[] = "SELECT *"; 
		$sql_query[] = "FROM  animations"; 
		$sql_query[] = "WHERE TIMESTAMP( '" . $start . "' ) BETWEEN animations.start AND animations.end";
		$sql_query[] = "AND state = 0"; 
		$sql_query[] = "LIMIT 1";
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) ); 
		$result = mysqli_query( $this->db, $sql_query );
		$num_rows = mysqli_num_rows($result);
		if( $num_rows <= 0 ) {
			return false ; 
		} else {
			return mysqli_fetch_assoc( $result ) ; 
		}
	}

	private function GetTimeOfLastScheduledAnimation( ) {
		// 1) Find the last scheduled animation 
		$sql_query = array();
		$sql_query[] = "SELECT start, end FROM animations";
		$sql_query[] = "WHERE state = 0 AND animations.start > CURRENT_TIMESTAMP() ";
		$sql_query[] = "ORDER BY animations.start DESC ";
		$sql_query[] = "LIMIT 1";
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) ); 
		$result = mysqli_query( $this->db, $sql_query );
		if( mysqli_num_rows($result) <= 0 ) {
			// This is not an error. This means that there is currently NO animation ahead of this animation. 
			// Start this animation now. 
			return date ( "Y-m-d H:i:s", time() + 60 ) ; 
		} else {
			// We found at lest one animation ahead of us. 
			$row = mysqli_fetch_assoc( $result ) ;
			return $row['end'] ;
		}
	}

	/**
	 * Returns: 
	 * 		false - if there is no black out period at this time. 
	 *      value - returns the schedule occuring at this time. 
	 */ 
	private function CheckForBlackOutPeriod( $startTime ) {
		$sql_query = array();
		$sql_query[] = "SELECT * FROM events";
		$sql_query[] = "WHERE TIMESTAMP( '". $startTime ."' ) BETWEEN events.start AND events.end "; 
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );
		$result = mysqli_query( $this->db, $sql_query );
		if( mysqli_num_rows($result) > 0 ) {
			// There is a schedual at this time. We need to fine another time to run the animation. 
			return mysqli_fetch_assoc( $result ); 
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

		// Find the schedule that fits one min past this time. 
		// -----------------------------------------------------------

		$sql_query = array();
		$sql_query[] = "SELECT * FROM `schedule` WHERE ";
		$sql_query[] = "TIME( TIMESTAMP( '". $startTime ."' ) ) > schedule.start";
		$sql_query[] = "AND TIME( TIMESTAMP( '". $startTime ."' ) ) < schedule.end";
		$sql_query[] = "AND schedule.type =1";
		$sql_query[] = "AND schedule.day >= dayofweek( TIMESTAMP( '". $startTime ."' ) ) ";
		$sql_query[] = "ORDER BY  `schedule`.`day` ASC ";
		$sql_query[] = "LIMIT 1 ";
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );
		$result = mysqli_query( $this->db, $sql_query );
		if( mysqli_num_rows($result) > 0 ) {
			return true ; // This is a good time 
		} else 
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  "FYI. No schedule at this current time. Find the next available schedule" ) );
			// No schedule at the current time of day. 
			// Search the next avaliable schedule. 

			// Date of the week
			// ------------------------
			// PHP: 0 (for Sunday) through 6 (for Saturday) 
			// MySQL: Returns the weekday index for date (1 = Sunday, 2 = Monday, …, 7 = Saturday). These index values correspond to the ODBC standard.
			$dayOfTheWeek = date( 'w', strtotime( $startTime ) ) ; 
			$dayOfTheWeek ++ ; // To change it from PHP version of the day of the week to MySQL version of day of the week. 
			$dayOfTheWeek ++ ; // Add one day to find the next schedule for the next day
			$dayOfTheWeek = $dayOfTheWeek % 6; // Loop around from Saturday to Sunday. 

			$sql_query = array();
			$sql_query[] = "SELECT * FROM schedule WHERE ";
			$sql_query[] = "schedule.day >= ". $dayOfTheWeek ." AND ";
			$sql_query[] = "schedule.type = 1 ";
			$sql_query[] = "ORDER BY schedule.day ASC ";
			$sql_query[] = "LIMIT 1 ";
			$sql_query = join( ' ', $sql_query );
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );

			$result = mysqli_query( $this->db, $sql_query );
			if( mysqli_num_rows($result) <= 0 ) {				
				if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  'Error: Are there any schedules at all ?' ) );
				return false;
			}
			
			return mysqli_fetch_assoc( $result );
	}

	/**
	 * Updates the animation schedule for the specified animation id. Returns true on success, false on failure.
	 * @param integer $id
	 * @param integer $timeOfAnimation
	 * @return boolean
	 */
	public function UpdateAnimationScheduleTime( $id, $timeOfAnimation = NULL ) {
		if( $id == NULL ) {
			// Error, Invalid USER ID 
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  "Error: Invalid ID prameter" ) );
			return false; 
		}

		if( $timeOfAnimation == NULL ) {
			$timeOfAnimation = 60 ; // Default of 1 mins 
		}

		// Get the last animation and add 60 secs to it. 
		$timeOfLastScheduledAnimation = $this->GetTimeOfLastScheduledAnimation()  ; 
		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  'Last schedule animation time: '. $timeOfLastScheduledAnimation ) );


		$scheduleTimeStart = $timeOfLastScheduledAnimation  ; 
		for( $attemps = 3 ; $attemps > 0 ; $attemps-- ) 
		{

			// We have a time that we need to test to see if it will work with the schedule and the black out events 
			$blackOutScheduleCheck = $this->CheckForBlackOutPeriod( $scheduleTimeStart ) ; 
			if( $blackOutScheduleCheck != true ) {
				// There is a black out schedule for this time. We can't use this time. 
				// Set the time for 1 mins past the current black out period then test the schedule 
				var_dump( $blackOutScheduleCheck ) ; 
				$scheduleTimeStart = $blackOutScheduleCheck[ 'end' ] ; 
				$schedulePeriod    = false ; // We changed the time. We have to recheck the schedule. 
			} else {
				if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  "Good: No events scheduled at this time" ) );
			}

			$schedulePeriodCheck = $this->CheckForSchedulePeriod( $scheduleTimeStart ) ; 
			if( $schedulePeriodCheck != true ) {
				var_dump( $schedulePeriodCheck ) ; 
				$scheduleTimeStart = date( "Y-m-d H:i:s", $schedulePeriodCheck['start'] ) ; 
				if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  'scheduleTimeStart: '. $scheduleTimeStart ) );
				$blackOutScheduleCheck  = false ; 
			} else {
				if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  "Good: Time inside a schedule" ) );
			}


			if( $blackOutScheduleCheck === true && $schedulePeriodCheck === true ) {
				if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  "Good: we found a good time." ) );
				break; // We found a good one. 
			}

			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__,  "FYI: We need to recheck." ) );
		}

		// Update the time. 
		$scheduleTimeEnd = date( "Y-m-d H:i:s", strtotime( $scheduleTimeStart ) + $timeOfAnimation ) ;

		$sql_query = "UPDATE animations SET start = '". $scheduleTimeStart ."', end = '". $scheduleTimeEnd ."' WHERE animations.id =". $id .";"; 
		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );
		$result = mysqli_query( $this->db, $sql_query );
		if( $result == NULL ) {
			return false ;
		}

		return true ; 
	}

	public function RunTest() {

		/*
		$table = new CHtmlTable() ; 
		
		echo '<h3>Schedule</h3>' ; 
		$table->Display( "schedule" ) ; 
		echo '<h3>Events</h3>' ; 
		$this->DisplayTable( "SELECT * FROM events LIMIT 0 , 30" ) ; 
		echo '<h3>animations (30) </h3>' ; 
		$this->DisplayTable( "SELECT * FROM animations LIMIT 0 , 30" ) ; 
		*/

		echo '<pre>'; 

		echo '<h3>Adding in test animations</h3>' ; 
		$sql_query = "INSERT INTO animations (user_id) VALUES ('1');"; 
		echo $sql_query . "\n"; 
		$result = mysqli_query( $this->db, $sql_query );
		if( $result == NULL ) {
			return false ;
		}
		$id = mysqli_insert_id( $this->db ) ; 
		echo "\n\n"; 



		echo '<h3>Check to see what the next animation is</h3>';
		$nextScheduleAnimation = $this->GetNextScheduleAnimation() ; 
		if( $nextScheduleAnimation === false ) {
			echo "No schedule animations\n" ; 
		}
		var_dump ( $nextScheduleAnimation ) ;
		echo "\n\n\n" ; 


		echo '<h3>Insert a new animations</h3>';
		$ret = $this->UpdateAnimationScheduleTime( $id, 60 ) ; 
		var_dump ( $ret ) ;
		echo "\n\n\n" ; 


		echo '</pre>'; 
	} 
}

// $schedule_instance = new CSchedule();
?>
