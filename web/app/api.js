// Define the Admin_API class
function Admin_API() {
	var self = this;
	
	// Variables
	this.request_token = "";
	this.authenticated = false;
	this.user_info = {};
	this.controllers = {};
	this.controller_modes = {};
	
	this.init = function() {
		self.checkAuthenticated();
	}

	// Define api_call method
	this.api_call = function( remote_method, params, handler ) {
		// Map the remote_method to the correct uri
		uri = '/admin/api/' + remote_method;

		// Do a post, serialize the params for the call
		$.post( uri, $.param( params, true ), handler );
	}
	
	this.validateEmail = function (email) {
	    var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
//		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	
	this.isAuthenticated = function() {
		console.log( "isAuthenticated: " + self.authenticated );
		return self.authenticated;
	}
	
	this.checkAuthenticated = function() {
		console.log( "checkAuthenticated: " + self.authenticated );
		var params = {};
		self.api_call(
				'checkauthenticated',
				params,
				function(data) {
					if( data.authenticated == false ) {
						self.authenticated = false;
						myApp.go( '/login' );
					} else if( data.authenticated == true ) {
						self.authenticated = true;
					}
					console.log( "Authenticated: " + api.authenticated );
				}
		);
		return self.authenticated;
	}
	
	this.updateUserInfo = function() {
		var params = {};
		self.api_call(
				'getuserinfo',
				{},
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.user_info = data.user_info;
						$("#userName").html(api.user_info.name);
					}
				}
		);
	}

	this.doLogin = function() {
		// Verify input
		if( $("#inputEmail").val() == '') {
			$("#login_message").html( "Missing user name!" ).addClass('error_message');
			$('#login_button').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else if( ! self.validateEmail( $("#inputEmail").val() ) ) {
			$("#login_message").html( "Invalid email address!" ).addClass("error_message");
			$('#login_button').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else if( $("#inputPassword").val() == '') {
			$("#login_message").html( "Missing password!" );
			$('#login_button').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else {
			var params = {};
			params['username'] = $("#inputEmail").val();
			params['password'] = $("#inputPassword").val();
			params['remember'] = $("#inputRemember").is(':checked');
	
			api.api_call(
				'login',
				params,
				function(data) {
					if( data.result == 'OK' ) {
						api.authenticated = true;
						console.log( "Authenticated: " + api.authenticated );
						myApp.go( '/main' );
						$("#login_message").html("").removeClass("error_message");
					} else {
						$("#login_message").html( data.message ).addClass("error_message");;
						$('#login_button').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
					}
				}
			);
		}
	}
	
	this.doLogout = function() {
		var params = {};
		self.api_call(
				'logout',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.user_info = {};
						self.authenticated = false;
					} else {
						alert( "Failed to log you out!\nERROR: " + data.message );
					}
				}
		);
	}
	
	this.getControllerModes = function() {
		var params = {};
		self.api_call(
				'getcontrollermodes',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controller_modes = data.modes;
					}
				}
		);
	}
	
	this.getControllers = function() {
		var params = {};
		self.api_call(
				'getcontrollers',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
					}
				}
		);
	}
	
	this.loadControllersTable = function() {
		var params = {};
		self.api_call(
				'controllers/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/controllers.tpl", function( template ) {
							var tpl = new jSmart( template );
							var controller_data = {};
							controller_data['controllers'] = api.controllers;
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.loadUsersTable = function() {
		var params = {};
		self.api_call(
				'users/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/users.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.loadAdminsTable = function() {
		var params = {};
		self.api_call(
				'admins/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						$.get( "/app/admin/fragments/admins.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.loadAnimationsTable = function() {
		var params = {};
		self.api_call(
				'animations/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						$.get( "/app/admin/fragments/animations.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.loadEventsTable = function() {
		var params = {};
		self.api_call(
				'events/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/events.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.loadSchedulesTable = function() {
		var params = {};
		self.api_call(
				'schedules/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/schedules.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.init();
}

// Initialize the FrontEnd_API
var api = new Admin_API();