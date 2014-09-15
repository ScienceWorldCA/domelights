// Define the FrontEnd_API class
function FrontEnd_API() {

	// Define api_call method
	this.api_call = function( remote_method, params, handler ) {
		// Map the remote_method to the correct uri
		uri = '/frontend_api/' + remote_method;

		// Do a post, serialize the params for the call
		$.post( uri, $.param( params, true ), handler );
	}

	this.DoStoreAnimation = function() {
		// Input
		var sequence = SequenceManager.SaveSequence();
		var emailInputAddress = document.getElementById( 'useremail' ).value;
		
		// Verify input
		if( document.getElementById( 'userrealname' ).value == '') {
			alert( "Missing user name!" );
			return false;
		} else if( document.getElementById( 'useremail' ).value == '') {
			alert( "Missing email address!" );
			return false;
		} else if( ! this.validateEmail( document.getElementById( 'useremail' ).value ) ) {
			alert( "Invalid email address!" );
			return false;
		} else {
			var params = {};
			params['sequence'] = sequence;
			params['useremail'] = document.getElementById( 'useremail' ).value;
			params['userrealname'] = document.getElementById( 'userrealname' ).value;
	
			this.api_call(
				'storesequence',
				params,
				function(data) {
					console.log( data );
					alert( data.message );
					if( data.result ) {
						document.getElementById('storeResult').disabled = true;
						document.getElementById('storeResult').value = 'Scheduled';
					} else {
						document.getElementById('storeResult').value = 'Retry';
					}
				}
			);
		}
	}
	
	this.validateEmail = function (email) { 
	    var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
//		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	} 
}

// Initialize the FrontEnd_API
var api = new FrontEnd_API();