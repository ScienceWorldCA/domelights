<?php

class ColoreSQLmapper {

	static public function generateSQL( $statementInfo ) {
		
		// If statementInfo is not an array, or if it is missing required fields, then bail
		if( ! is_array( $statementInfo ) || ! isset( $statementInfo['action'] ) || ! isset( $statementInfo['table'] ) )
			return null;
		
		// Check for required fields on select, update and insert.
		if( preg_match( '/(select|update|insert)/', $statementInfo['action'] ) && ( ! is_array( $statementInfo['fields'] ) || count( $statementInfo['fields'] ) == 0 ) )
			return null;
		
		// Initialize statement variable
		$sqlResult = array();
		$sqlResult['statement'] = array();
		$sqlResult['arguments'] = array();
		
		if( LOGLEVEL & LOG_DEBUG )
			error_log( sprintf( "%s/%s: Generating sql for action: %s", __METHOD__, __LINE__, $statementInfo['action'] ) );
		// Start statement based on
		switch( $statementInfo['action'] ) {
			
			// INSERT
			case "insert";
				$sqlResult['statement'][0] = "INSERT INTO";
				$sqlResult['statement'][1] = $statementInfo['table'];
				
				// field names
				$fieldNames = array();
				$fieldReferences = array();

				reset( $statementInfo['fields'] );
				
				// loop over fields and generate appropriate arrays
				for( $i = 0 ; $i < count( $statementInfo['fields'] ) ; $i++ ) {
					// Fetch the next field
					list( $fieldKey, $fieldVal ) = each( $statementInfo['fields'] );
					
					// Generate the descriptor
					$fieldDescriptor = sprintf( ":%s", $fieldKey );
					
					// Add the values to both the statement and arguments
					$fieldNames[] = $fieldKey;
					$fieldDescriptors[] = $fieldDescriptor;
					$sqlResult['arguments'][$fieldDescriptor] = $fieldVal;
				}
				
				$sqlResult['statement'][] = sprintf( "( %s )", join( ',', $fieldNames ) );
				$sqlResult['statement'][] = "VALUES";
				$sqlResult['statement'][] = sprintf( "( %s )", join( ',', $fieldDescriptors ) );

				// Done
				break;
			
			// UPDATE
			case "update";
				$sqlResult['statement'][] = "UPDATE";
				$sqlResult['statement'][] = $statementInfo['table'];
				$sqlResult['statement'][] = "SET";
				for( $i = 0 ; $i < count( $statementInfo['fields'] ) ; $i++ ) {
					// If we move ahead past the first field, insert a comma to separate arguments
					if( $i > 0 )
						$sqlResult['statement'][] = ',';
					
					// Fetch the next field
					list( $fieldKey, $fieldVal ) = each( $statementInfo['fields'] );
					
					// Generate the descriptor
					$fieldDescriptor = sprintf( ":%s", $fieldKey );
					
					// Add the values to both the statement and arguments
					$sqlResult['statement'][] .= sprintf( "%s = %s", $fieldKey, $fieldDescriptor );
					$sqlResult['arguments'][$fieldDescriptor] = $fieldVal;
				}
				
				// If criteria has been set, then add it
				if( isset( $statementInfo['criteria'] ) ) {
					$sqlResult['statement'][] = sprintf( "WHERE" );
					for( $i = 0 ; $i < count( $statementInfo['criteria'] ) ; $i++ ) {
						// If we move ahead past the first field, insert a comma to separate arguments
						if( $i > 0 )
							$sqlResult['statement'][] = "AND";
						list( $fieldKey, $fieldVal ) = each( $statementInfo['criteria'] );
						$fieldDescriptor = sprintf( ":%s", $fieldKey );
						$sqlResult['statement'][] = sprintf( "%s = :%s", $fieldKey, $fieldKey );
						$sqlResult['arguments'][$fieldDescriptor] = $fieldVal;
					}
				}
				
				break;
			
			// SELECT
			case "select";
				$sqlResult['statement'][] = "SELECT";
				for( $i = 0 ; $i < count( $statementInfo['fields'] ) ; $i++ ) {
					// If we move ahead past the first field, insert a comma to separate arguments
					if( $i > 0 )
						$sqlResult['statement'][] = ',';
					
					// Fetch the next field
					list( $fieldKey, $fieldVal ) = each( $statementInfo['fields'] );
					
					// Generate the descriptor
// 					$fieldDescriptor = sprintf( ":%s", $fieldKey );
					
					// Add the values to both the statement and arguments
					if( $fieldVal )
						$sqlResult['statement'][] .= sprintf( "%s", $fieldKey );
				}
				$sqlResult['statement'][] = "FROM";
				$sqlResult['statement'][] = $statementInfo['table'];

				// If criteria has been set, then add it
				if( isset( $statementInfo['criteria'] ) ) {
					$sqlResult['statement'][] = sprintf( "WHERE" );
					for( $i = 0 ; $i < count( $statementInfo['criteria'] ) ; $i++ ) {
						// If we move ahead past the first field, insert a comma to separate arguments
						if( $i > 0 )
							$sqlResult['statement'][] = "AND";
				
						list( $fieldKey, $fieldVal ) = each( $statementInfo['criteria'] );
						$fieldDescriptor = sprintf( ":%s", $fieldKey );
						$sqlResult['statement'][] = sprintf( "%s = :%s", $fieldKey, $fieldKey );
						$sqlResult['arguments'][$fieldDescriptor] = $fieldVal;
					}
				}

				// If order has been set, then add it
				if( isset( $statementInfo['order'] ) ) {
					$sqlResult['statement'][] = sprintf( "ORDER BY" );
					for( $i = 0 ; $i < count( $statementInfo['order'] ) ; $i++ ) {
						// If we move ahead past the first field, insert a comma to separate arguments
						if( $i > 0 )
							$sqlResult['statement'][] = ",";
				
						list( $fieldKey, $fieldOrder ) = each( $statementInfo['order'] );
						$fieldDescriptor = sprintf( ":%s", $fieldKey );
						$sqlResult['statement'][] = sprintf( "%s %s", $fieldKey, $fieldOrder );
					}
				}
				
				break;
			
			// DELETE
			case "delete";
				if( LOGLEVEL & LOG_DEBUG )
					error_log( sprintf( "%s/%s: Generating SQL for delete on: %s", __METHOD__, __LINE__, $statementInfo['table'] ) );
				$sqlResult['statement'][] = "DELETE FROM";
				$sqlResult['statement'][] = $statementInfo['table'];

				// If criteria has been set, then add it
				if( isset( $statementInfo['criteria'] ) ) {
					$sqlResult['statement'][] = sprintf( "WHERE" );
					for( $i = 0 ; $i < count( $statementInfo['criteria'] ) ; $i++ ) {
						// If we move ahead past the first field, insert a comma to separate arguments
						if( $i > 0 )
							$sqlResult['statement'][] = "AND";
				
						list( $fieldKey, $fieldVal ) = each( $statementInfo['criteria'] );
						$fieldDescriptor = sprintf( ":%s", $fieldKey );
						$sqlResult['statement'][] = sprintf( "%s = :%s", $fieldKey, $fieldKey );
						$sqlResult['arguments'][$fieldDescriptor] = $fieldVal;
					}
				}
				
				break;
				
			// Default is to break
			default;
				if( LOGLEVEL & LOG_NOTICE )
					error_log( sprintf( "%s/%s: Unknown action for: %s", __METHOD__, __LINE__, print_r( $statementInfo, 1 ) ) );
				return null;
				break;
		}
		
		// Join to add it all together with spaces
		$sqlResult['statement'] = join( ' ', $sqlResult['statement'] );
		
		if( LOGLEVEL & LOG_DEBUG ) {
			error_log( sprintf( "%s/%s: Query: %s", __METHOD__, __LINE__, print_r( $sqlResult['statement'], 1 ) ) );
			error_log( sprintf( "%s/%s: Arguments: %s", __METHOD__, __LINE__, print_r( $sqlResult['arguments'], 1 ) ) );
		}
		
		// Return the combined result set
		return $sqlResult;
		
	}
	
}

?>