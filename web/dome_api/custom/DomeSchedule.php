<?php
// Connnect to the database
require_once( dirname( __FILE__ ) . '/../etc/config.php' );

class CSchedule
{
	private $db;
	private $DEBUG = true;

	function __construct()
	{
		global $config;

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
			$start = date( "Y-m-d H:i:s" );
		}

		// NOTE: MySQL command BETWEEN is inclusive of the start and end timestamps.
		$sql_query = array();
		$sql_query[] = "SELECT *";
		$sql_query[] = "FROM animations";
		$sql_query[] = sprintf( "WHERE '%s' BETWEEN animations.start AND animations.end", $start );
		$sql_query[] = "AND state = 0";
		$sql_query[] = "LIMIT 1";
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );
		$result = mysqli_query( $this->db, $sql_query );
		$num_rows = mysqli_num_rows($result);
		if( $num_rows <= 0 ) {
			return false;
		} else {
			return mysqli_fetch_assoc( $result );
		}
	}

	private function GetTimeOfLastScheduledAnimation( ) {
		// 1) Find the last scheduled animation
		$sql_query = array();
		$sql_query[] = "SELECT start, end FROM animations";
		$sql_query[] = "WHERE state = 0";
		$sql_query[] = sprintf( "AND animations.start > '%s'", date( "Y-m-d H:i:s" ) );
		$sql_query[] = "ORDER BY animations.start DESC ";
		$sql_query[] = "LIMIT 1";
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );

		$result = mysqli_query( $this->db, $sql_query );
		if( mysqli_num_rows($result) <= 0 ) {
			// This is not an error. This means that there is currently NO animation ahead of this animation.
			// Start this animation now.
			return date( "Y-m-d H:i:s", time() + 60 );
		} else {
			// We found at least one animation ahead of us.
			$row = mysqli_fetch_assoc( $result );
			return $row['end'];
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
		$sql_query[] = "AND active = 1";
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );
		$result = mysqli_query( $this->db, $sql_query );
		if( mysqli_num_rows($result) > 0 ) {
			// There is a schedule at this time. We need to fine another time to run the animation.
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
		$sql_query[] = "SELECT * FROM schedule WHERE ";
		$sql_query[] = "DATE_FORMAT( TIMESTAMP( '". $startTime ."' ), '%H%i' ) > schedule.start";
		$sql_query[] = "AND DATE_FORMAT( TIMESTAMP( '". $startTime ."' ), '%H%i' ) < schedule.end";
		$sql_query[] = "AND schedule.type = 1";
		$sql_query[] = "AND schedule.active = 1";
		$sql_query[] = "AND schedule.day >= dayofweek( TIMESTAMP( '". $startTime ."' ) ) ";
		$sql_query[] = "ORDER BY schedule.day ASC ";
		$sql_query[] = "LIMIT 1 ";
		$sql_query = join( ' ', $sql_query );

		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );
		$result = mysqli_query( $this->db, $sql_query );
		if( $result != false && mysqli_num_rows($result) > 0 ) {
			return true; // This is a good time
		} else
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, "FYI. No schedule at this current time. Find the next available schedule" ) );
			// No schedule at the current time of day.
			// Search the next avaliable schedule.

			// Date of the week
			// ------------------------
			// PHP: 0 (for Sunday) through 6 (for Saturday)
			// MySQL: Returns the weekday index for date (1 = Sunday, 2 = Monday, …, 7 = Saturday). These index values correspond to the ODBC standard.
			$dayOfTheWeek = date( 'w', strtotime( $startTime ) );
			$dayOfTheWeek ++; // To change it from PHP version of the day of the week to MySQL version of day of the week.
// 			$dayOfTheWeek ++; // Add one day to find the next schedule for the next day
			$dayOfTheWeek = $dayOfTheWeek % 6; // Loop around from Saturday to Sunday.

			$schedule_query = array();
			$schedule_query[] = "SELECT day, start FROM schedule";
			$schedule_query[] = "WHERE schedule.day >= %d";
			$schedule_query[] = "AND schedule.type = 1";
			$schedule_query[] = "AND schedule.active = 1";
			$schedule_query[] = "ORDER BY schedule.day ASC";
			$schedule_query[] = "LIMIT 1 ";
			
			// First try on/after today
			$sql_query = sprintf( join( ' ', $schedule_query ), $dayOfTheWeek );
			
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, $sql_query ) );

			$result = mysqli_query( $this->db, $sql_query );
			
			if( $result != true ) {
				error_log( sprintf( "%s/%s: Error in schedule query", __METHOD__, __LINE__ ) );
				return false;
			}
			
			// If we didn't get any results, we query again from the start of the week
			if( mysqli_num_rows( $result ) == 0 ) {
				$sql_query = join( ' ', sprintf( $schedule_query, 0 ) );
				$result = mysqli_query( $this->db, $sql_query );
				
				if( $result != true ) {
					error_log( sprintf( "%s/%s: Error in schedule query", __METHOD__, __LINE__ ) );
					return false;
				}
			}
			
			// We now have a result, so we fetch the result data
			$schedule_data = mysqli_fetch_assoc( $result );

			// We translate the data to an actual form
			$schedule_day = $schedule_data['day'];
			if( $schedule_day < $dayOfTheWeek )
				$schedule_day += 7;
			$schedule_day_delta = ( $schedule_day - $dayOfTheWeek );
			$schedule_start = $schedule_data['start'];
			
			$new_datestamp = strtotime( sprintf( "+%d day", $schedule_day_delta ) );
			$new_date = strtotime( sprintf( "%d:%d", substr( $schedule_start, 0, 2 ), substr( $schedule_start, 2, 2 ) ), $new_datestamp );

			if( $this->DEBUG ) error_log( sprintf( "%s/%s: schedule_day_delta: [%s]", __METHOD__, __LINE__, $schedule_day_delta ) );
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: new_datestamp: [%s]", __METHOD__, __LINE__, $new_datestamp ) );
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: new_date: [%s]", __METHOD__, __LINE__, $new_date ) );

			$return_date = date( "Y-m-d H:i:s", $new_date );
			
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: Return Date: [%s]", __METHOD__, __LINE__, $return_date ) );

			return $return_date;
	}

	/**
	 * Updates the animation schedule for the specified animation id. Returns true on success, false on failure.
	 * @param integer $id
	 * @param integer $timeOfAnimation
	 * @return boolean
	 */
	public function UpdateAnimationScheduleTime( $id, $timeOfAnimation = 60 ) {
		if( $id == NULL || ! is_numeric( $id ) ) {
			// Error, Invalid ID
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, "Error: Invalid ID prameter" ) );
			return false;
		}

		// Get the last animation and add 60 secs to it.
		$timeOfLastScheduledAnimation = $this->GetTimeOfLastScheduledAnimation();
		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, 'Last schedule animation time: '. $timeOfLastScheduledAnimation ) );

		$scheduleTimeStart = $timeOfLastScheduledAnimation;

		// We have a time that we need to test to see if it will work with the schedule and the black out events
		$blackOutScheduleCheck = $this->CheckForBlackOutPeriod( $scheduleTimeStart );
		if( is_array( $blackOutScheduleCheck ) ) {
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: Blackout period for [%d] at [%s]", __METHOD__, __LINE__, $id, $timeOfLastScheduledAnimation ) );
			// There is a black out schedule for this time. We can't use this time.
			// Set the time for 1 mins past the current black out period then test the schedule
			$scheduleTimeStart = $blackOutScheduleCheck[ 'end' ];
			$schedulePeriod = false; // We changed the time. We have to recheck the schedule.
		} else {
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: Good: No blackout events scheduled at this time", __METHOD__, __LINE__ ) );
		}

		// Check for schedule - this returns the scheduleTimeStart if it's valid, else it returns the new time
		$schedulePeriodCheck = $this->CheckForSchedulePeriod( $scheduleTimeStart );
		if( is_array( strtotime( $schedulePeriodCheck ) ) === true ) {
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: Good: Time inside a schedule", __METHOD__, __LINE__ ) );
			$scheduleTimeStart = $schedulePeriodCheck;
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, 'scheduleTimeStart: '. $scheduleTimeStart ) );
		} else {
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: Schedule period check failed for [%d] at [%s]: %s", __METHOD__, __LINE__, $id, $scheduleTimeStart, $schedulePeriodCheck ) );
		}

		if( $schedulePeriodCheck != $scheduleTimeStart ) {
			if( $this->DEBUG ) error_log( sprintf( "%s/%s: we found a new good time.", __METHOD__, __LINE__ ) );
			$scheduleTimeStart = $schedulePeriodCheck;
		}
		
		// Update the time.
		$scheduleTimeEnd = date( "Y-m-d H:i:s", strtotime( $scheduleTimeStart ) + $timeOfAnimation );

		$sql_query = array();
		$sql_query[] = "UPDATE animations";
		$sql_query[] = sprintf( "SET start = '%s',", $scheduleTimeStart );
		$sql_query[] = sprintf( "end = '%s'", $scheduleTimeEnd );
		$sql_query[] = sprintf( "WHERE animations.id = %d", $id );
		
		if( $this->DEBUG ) error_log( sprintf( "%s/%s: %s", __METHOD__, __LINE__, join( ' ', $sql_query ) ) );
		$result = mysqli_query( $this->db, join( ' ', $sql_query ) );
		if( $result == NULL ) {
			return false;
		}

		return true;
	}

	public function RunTest() {

		/*
		$table = new CHtmlTable();

		echo '<h3>Schedule</h3>';
		$table->Display( "schedule" );
		echo '<h3>Events</h3>';
		$this->DisplayTable( "SELECT * FROM events LIMIT 0 , 30" );
		echo '<h3>animations (30) </h3>';
		$this->DisplayTable( "SELECT * FROM animations LIMIT 0 , 30" );
		*/

		echo '<pre>';

		echo '<h3>Adding in test animations</h3>';
		$sql_query = "INSERT INTO animations (user_id) VALUES ('1');";
		echo $sql_query . "\n";
		$result = mysqli_query( $this->db, $sql_query );
		if( $result == NULL ) {
			return false;
		}
		$id = mysqli_insert_id( $this->db );
		echo "\n\n";



		echo '<h3>Check to see what the next animation is</h3>';
		$nextScheduleAnimation = $this->GetNextScheduleAnimation();
		if( $nextScheduleAnimation === false ) {
			echo "No schedule animations\n";
		}
		var_dump ( $nextScheduleAnimation );
		echo "\n\n\n";


		echo '<h3>Insert a new animations</h3>';
		$ret = $this->UpdateAnimationScheduleTime( $id, 60 );
		var_dump ( $ret );
		echo "\n\n\n";


		echo '</pre>';
	}
}

// $schedule_instance = new CSchedule();
?>