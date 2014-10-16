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
		if( scheduled ) {
			alert( "You have already submitted a scheduled animation.\nPlease try again later!" );
			$("#submitmessage").empty();
			return false;
		}
		// Input
		var sequence = SequenceManager.SaveSequence();
		
		// Verify input
		if( $("#userrealname").val() == '') {
			$("#submitmessage").html( "Missing user name!" ).addClass("warning");
			$('#submitbutton').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else if( $("#useremail").val() == '') {
			$("#submitmessage").html( "Missing email address!" ).addClass("warning");
			$('#submitbutton').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else if( ! this.validateEmail( $("#useremail").val() ) ) {
			$("#submitmessage").html( "Invalid email address!" ).addClass("warning");
			$('#submitbutton').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else if( ! $("#useragrees").prop( 'checked' ) ) {
			$("#submitmessage").html( "Please agree to the terms!" ).addClass("warning");
			$('#submitbutton').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else {
			var params = {};
			params['sequence'] = sequence;
			params['useremail'] = $("#useremail").val();
			params['userrealname'] = $("#userrealname").val();
	
			this.api_call(
				'storesequence',
				params,
				function(data) {
					console.log( data );
					if( data.result ) {
						$("#submitmessage").html( '<pre>' + data.message + '</pre>' );
						$('#submitbutton').prop( 'disabled', true );
						$('#submitbutton').html( 'Scheduled' ).removeClass("red").removeClass("blue").addClass("green");
						$("#submitmessage").removeClass("warning");
						scheduled = true;
						$("#submitbutton").on("click", function (e) {
					        e.preventDefault();
					    });
					} else {
						$("#submitmessage").html( data.message );
						$("#submitmessage").addClass("warning");
						$('#submitbutton').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
					}
				}
			);
		}
	}
}

// Initialize the FrontEnd_API
var api = new FrontEnd_API();