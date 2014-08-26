function FrontEnd_API() {
	this.receivedResponse = false;
	this.result = '';

	this.api_call = function(remote_method, params, handler) {
		uri = '/frontend_api/' + remote_method;

		$.post(uri, $.param(params, true), handler);
	}

	this.DoStoreAnimation = function() {
		// Input
		var sequence = EventManager.SaveSequence();
		var emailInputAddress = document.getElementById( 'useremail' );
		
		// Verify input
		if( emailInputAddress.value == '') {
			alert( "Missing email address!" );
			return false;
		} else if( ! this.validateEmail( emailInputAddress.value ) ) {
			alert( "Invalid email address!" );
			return false;
		} else {
			var params = {};
			params['sequence'] = sequence;
			params['useremail'] = emailInputAddress.value;
	
			this.api_call(
				'storesequence',
				params,
				function(data) {
					alert( data.schedule_message );
					if( data.result ) {
						document.getElementById('storeResult').value = data.message;
					} else {
						document.getElementById('storeResult').value = 'Publish';
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