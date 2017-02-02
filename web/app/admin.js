var myApp = new ColoreStateMachine();

myApp.addContext( '/login', function() {
	if( api.isAuthenticated() ) {
		myApp.dispatch( '/home' );
	}
	api.getNonce();
	myApp.loadTemplate("/app/admin/templates/login.html");
});

myApp.addContext( '/do-login', function( args ) {
	var res = api.doLogin( args );
	return false;
});

myApp.addContext( '/logout', function( args ) {
	api.doLogout();
});

myApp.addContext( '/home', function( args ) {
	if( ! api.isAuthenticated() ) {
		myApp.dispatch( '/login' );
		return false;
	}
	myApp.loadTemplate("/app/admin/templates/main.html");
	myApp.loadFragment("/app/admin/fragments/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
});

myApp.addContext( '/admins', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadAdminsTable();
});

myApp.addContext( '/admins/view', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadAdminsView( args );
});

myApp.addContext( '/animations', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
//	myApp.loadFragment("/app/admin/fragments/animations.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadAnimationsTable();
});

myApp.addContext( '/controllers', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadControllersTable();
//	myApp.loadFragment("/app/admin/fragments/controllers.html");
});

myApp.addContext( '/controllers/view', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadControllerView( args );
});

myApp.addContext( '/controllers/edit', function( args ) {
	console.log( args );
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadControllerEdit( args );
});

myApp.addContext( '/controllers/update', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateController( args );
	return false;
});

myApp.addContext( '/controllers/new', function( args ) {
	api.checkAuthenticated();
	myApp.loadTemplate("/app/admin/templates/main.html");
	var data = {};
	$.get( "/app/admin/fragments/controllers-new.tpl", function( template ) {
		var tpl = new jSmart( template );
		var rendered = tpl.fetch( data );
		$("#ColoreFragment").html( rendered );
	} );
});

myApp.addContext( '/controllers/create', function( args ) {
	api.createController( args );
	return false;
});

myApp.addContext( '/controllers/delete', function( args ) {
	api.deleteController( args );
	return false;
});

myApp.addContext( '/events', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadEventsTable();
});

myApp.addContext( '/schedules', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadSchedulesTable();
});

myApp.addContext( '/users', function( args ) {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadUsersTable();
});

myApp.setDefaultContext( '/home' );