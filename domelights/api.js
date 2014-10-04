// Define the FrontEnd_API class
function FrontEnd_API() {

	// Define api_call method
	this.api_call = function( remote_method, params, handler ) {
		// Map the remote_method to the correct uri
		uri = '/frontend_api/' + remote_method;

		// Do a post, serialize the params for the call
		$.post( uri, $.param( params, true ), handler );
	}
	
	this.validateEmail = function (email) { 
	    var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
//		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	} 

	this.DoStoreAnimation = function() {
		// Input
		var sequence = SequenceManager.SaveSequence();
		var emailInputAddress = $('#useremail').val();
		
		// Verify input
		if( $( '#userrealname' ).val() == '') {
			alert( "Missing user name!" );
			return false;
		} else if( $( '#useremail' ).val() == '') {
			alert( "Missing email address!" );
			return false;
		} else if( ! this.validateEmail( $('#useremail').val() ) ) {
			alert( "Invalid email address!" );
			return false;
		} else {
			var params = {};
			params['sequence'] = sequence;
			params['useremail'] = $('useremail').val();
			params['userrealname'] = $('userrealname').val();
	
			this.api_call(
				'storesequence',
				params,
				function(data) {
					console.log( data );
					if( data.result ) {
						$('#storeResult').prop( 'disabled', true );
						$('#storeResult').val( 'Scheduled' );
						$('#userinput').css( 'visibility', 'hidden' );
						showPopupMessage( 'Amination submission successful', data.message );
					} else {
						alert( data.message );
						$('#storeResult').val( 'Retry' );
					}
				}
			);
		}
	}
}

// Initialize the FrontEnd_API
var api = new FrontEnd_API();