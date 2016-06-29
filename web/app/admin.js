var myApp = new ColoreStateMachine();

myApp.addContext( '/login', function() {
	if( api.isAuthenticated() ) {
		myApp.go( '/main' );
	}
	myApp.loadTemplate("/app/admin/templates/login.html");
})

myApp.addContext( '/logout', function() {
	if( api.isAuthenticated() ) {
		api.doLogout();
		myApp.go( '/main' );
	}
	myApp.loadTemplate("/app/admin/templates/login.html");
})

myApp.addContext( '/main', function() {
	myApp.loadTemplate("/app/admin/templates/main.html");
	myApp.loadFragment("/app/admin/fragments/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
});

myApp.addContext( '/admins', function() {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadAdminsTable();
});

myApp.addContext( '/animations', function() {
	myApp.loadTemplate("/app/admin/templates/main.html");
//	myApp.loadFragment("/app/admin/fragments/animations.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadAnimationsTable();
});

myApp.addContext( '/controllers', function() {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadControllersTable();
//	myApp.loadFragment("/app/admin/fragments/controllers.html");
});

myApp.addContext( '/events', function() {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadEventsTable();
});

myApp.addContext( '/schedules', function() {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadSchedulesTable();
});

myApp.addContext( '/users', function() {
	myApp.loadTemplate("/app/admin/templates/main.html");
	api.checkAuthenticated();
	api.updateUserInfo();
	api.loadUsersTable();
});

myApp.setDefaultContext( '/main' );