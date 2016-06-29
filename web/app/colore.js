function ColoreStateMachine() {
	var self = this;
	this.context = "";
	this.contexts = [];
	this.settings = [];
	
	this.init = function() {
		$(document).ready(function() {
			$(window).on('hashchange', function() {
				self.run();
			});
			self.run();
		});
	}
	
	this.getHash = function() {
		var hash = location.hash;
		
		if( hash == '' )
			return false;
		
		if( hash.substring(0,1) == '\?' )
			hash = hash.substring(1);
		
		if( hash.substring(0,1) == '#' )
			hash = hash.substring(1);
		
		return hash;
	}

	this.addContext = function( context, handler ) {
		this.contexts[context] = handler;
	}

	this.loadContext = function( context ) {
		if( this.contexts[context] !== undefined ) {
			console.log( "ColoreStateMachine.loadContext: Loading '" + context + "'" );
			this.context = context;
			this.contexts[context]();
		} else {
			console.log( "ColoreStateMachine.loadContext: Missing context '" + context + "'" );
			alert( "Invalid action!" );
		}
	}
	
	this.getContext = function() {
		return this.context;
	}
	
	this.setDefaultContext = function( context ) {
		console.log( "ColoreStateMachine.setDefaultContext: " + context );
		this.settings['default'] = context;
	}
	
	this.go = function( context ) {
		location.hash = context;
	}
	
	this.home = function() {
		location.hash = this.settings['default'];
	}
	
	this.loadTemplate = function( templateFile ) {
		if( $("#ColoreContainer").attr( 'template' ) == templateFile )
			return false;
		
		console.log( "ColoreStateMachine.loadTemplate -> " + templateFile );
		$("#ColoreContainer").load( templateFile ).attr( 'template', templateFile );
	} 
	
	this.loadFragment = function( fragmentFile ) {
		if( $("#ColoreFragment").attr( 'template' ) == fragmentFile )
			return false;
		
		console.log( "ColoreStateMachine.loadFragment -> " + fragmentFile );
		$("#ColoreFragment").load( fragmentFile ).attr( 'template', fragmentFile );
	} 
	
	this.run = function() {
		var hash = this.getHash();
		
		console.log( "ColoreStateMachine.run: Detecting context: [" + hash + "]" );
		
		if( hash != false ) {
			this.loadContext( hash );
		} else if( this.context == "" ) {
			this.go( this.settings['default'] );
		}

	}
	
	this.init();
}