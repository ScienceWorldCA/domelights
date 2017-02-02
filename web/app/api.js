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
	this.api_call = function( uri, params, handler ) {
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
				'/admin/api/session/authenticated',
				params,
				function(data) {
					if( data.authenticated == false ) {
						self.authenticated = false;
						myApp.dispatch( '/login' );
					} else if( data.authenticated == true ) {
						self.authenticated = true;
						console.log( myApp.getContextName() );
						if( '/login' == myApp.getContextName() ) {
							myApp.dispatch( '/home' );
						}
					}
					console.log( "Authenticated: " + api.authenticated );
				}
		);
	}
	
	this.updateUserInfo = function() {
		if( $("#userName").html() == '' ) {
			var params = {};
			self.api_call(
					'/admin/api/session/info',
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
	}

	this.doLogin = function( args ) {
		if( args.username == '') {
			$("#login_message").html( "Missing user name!" ).addClass('error_message');
			$('#login_button').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else if( ! self.validateEmail( args.username ) ) {
			$("#login_message").html( "Invalid email address!" ).addClass("error_message");
			$('#login_button').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else if( args.password == '') {
			$("#login_message").html( "Missing password!" );
			$('#login_button').html( 'Retry' ).addClass("red").removeClass("blue").removeClass("green");
			return false;
		} else {
			var params = {};
			params['username'] = args.username;
			params['password'] = nacl.util.encodeBase64( sha256.pbkdf2( args.username + ":" + args.password, nacl.util.encodeBase64( sha256.hash( args.username ) ), 10000, 512 ) );
			console.log( "Password: " + params['password'] );
			params['remember'] = args.remember;
	
			api.api_call(
				'/admin/api/session/login',
				params,
				function(data) {
					if( data.result == 'OK' ) {
						api.authenticated = true;
						this.authenticated = true;
						console.log( "Authenticated: " + api.authenticated );
						myApp.dispatch( '/home' );
						$("#login_message").html("").removeClass("error_message");
					} else {
						this.authenticated = false;
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
				'/admin/api/session/logout',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.user_info = {};
						self.authenticated = false;
						myApp.dispatch( '/login' );
					} else {
						alert( "Failed to log you out!\nERROR: " + data.message );
					}
				}
		);
	}
	
	this.getControllerModes = function() {
		var params = {};
		self.api_call(
				'/admin/api/controllers/modes/list',
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
				'/admin/api/controllers/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
					}
				}
		);
	}
	
	this.fillControllerModes = function( elementID ) {
		var params = {};

		api.api_call(
			'/admin/api/controllers/modes/list',
			params,
			function( data ) {
				var listItems= "";
				$.each( data['modes'], function( idx, mode ) {
					if( $( elementID ).data( 'id' ) == mode.id ) {
						listItems+= "<option selected value='" + mode.id + "'>" + mode.description + "</option>";
					} else {
						listItems+= "<option value='" + mode.id + "'>" + mode.description + "</option>";
					}
				});
				$( elementID ).html( listItems );
			}
		);
		

	}
	
	this.fillControllerScripts = function( elementID ) {
		var params = {};
		
		api.api_call(
				'/admin/api/controllers/scripts/list',
				params,
				function( data ) {
					var listItems= "";
					$.each( data['scripts'], function( idx, script ) {
						if( $( elementID ).data( 'id' ) == script ) {
							listItems+= "<option selected>" + script + "</option>";
						} else {
							listItems+= "<option>" + script + "</option>";
						}
					});
					$( elementID ).html( listItems );
				}
		);
		
		
	}
	
	this.loadControllersTable = function() {
		var params = {};
		self.api_call(
				'/admin/api/controllers/list',
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
	
	this.loadControllerView = function( args ) {
		console.log( "loadControllerView:" );
		console.log( args );
		var params = args;
		params['id'] = args.id;
		self.api_call(
				'/admin/api/controllers/view',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/controllers-view.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.loadControllerEdit = function( args ) {
		console.log( "loadControllerEdit:" );
		console.log( args );
		var params = {};
		params['id'] = args['id'];
		self.api_call(
				'/admin/api/controllers/view',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/controllers-edit.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.updateController = function( args ) {
		console.log( "updateController:" );
		console.log( args );
		var params = args;
		self.api_call(
				'/admin/api/controllers/update',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/controllers-edit.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					} else if( data.result == 'ERROR' && data.authenticated == false ) {
						myApp.dispatch( '/login' );
					}
				}
		);
	}
	
	this.createController = function( args ) {
		console.log( "createController:" );
		console.log( args );
		var params = args;
		self.api_call(
				'/admin/api/controllers/create',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						self.controllers = data.controllers;
						$.get( "/app/admin/fragments/controllers-view.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					} else if( data.result == 'ERROR' && data.authenticated == false ) {
						myApp.dispatch( '/login' );
					}
				}
		);
	}
	
	this.deleteController = function( args ) {
		console.log( "deleteController:" );
		console.log( args );
		var params = args;
		self.api_call(
				'/admin/api/controllers/delete',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						myApp.dispatch( '/controllers' );
					} else if( data.result == 'ERROR' && data.authenticated == false ) {
						myApp.dispatch( '/login' );
					}
				}
		);
	}
	
	this.loadUsersTable = function() {
		var params = {};
		self.api_call(
				'/admin/api/users/list',
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
				'/admin/api/admins/list',
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
	
	this.loadAdminsView = function() {
		var params = {};
		self.api_call(
				'/admin/api/admins/view',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						$.get( "/app/admin/fragments/admins-view.tpl", function( template ) {
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
				'/admin/api/animations/list',
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
				'/admin/api/events/list',
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
				'/admin/api/schedules/list',
				params,
				function(data) {
					console.log( data );
					if( data.result == 'OK' ) {
						$.get( "/app/admin/fragments/schedules.tpl", function( template ) {
							var tpl = new jSmart( template );
							var rendered = tpl.fetch( data );
							$("#ColoreFragment").html( rendered );
						} );
					}
				}
		);
	}
	
	this.getNonce = function() {
		var params = {};
		self.api_call( '/admin/api/getnonce', params, function(data) { self.nonce = data.nonce; } );
	}
	
	this.init();
}

// Initialize the FrontEnd_API
var api = new Admin_API();