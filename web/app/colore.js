function ColoreStateMachine() {
	var self = this;
	this.context = "";
	this.contexts = [];
	this.settings = [];
	this.context_info = [];
	
	this.init = function() {
		$(document).ready(function() {
//			$(window).on('hashchange', function() {
//				self.service();
//			});
			self.service();
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
	
	this.getContext = function() {
		var context = this.getHash();
		
		if( context == false )
			return context;
		
		var args = context.indexOf( '?' );
		
		if( args )
			context = context.substr( 0, ( args - 1 ) );
		
		return context;
	}

	this.addContext = function( context, handler ) {
		this.contexts[context] = handler;
	}

	this.loadContext = function( context, args ) {
		if( this.contexts[context] !== undefined ) {
			console.log( "ColoreStateMachine.loadContext: Loading '" + context + "'" );
			this.contextName = context;
			var res = this.contexts[context]( args );
			if( res == false ) {
				return false;
			} else {
				location.hash = context;
			}
		} else {
			console.log( "ColoreStateMachine.loadContext: Missing context '" + context + "'" );
			alert( "Invalid action!" );
			this.loadContext( this.settings['default'] );
		}
	}
	
	this.getContextName = function() {
		return this.contextName;
	}
	
	this.setDefaultContext = function( context ) {
		console.log( "ColoreStateMachine.setDefaultContext: " + context );
		this.settings['default'] = context;
	}
	
	this.go = function( context ) {
		this.dispatch( context );
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
		console.log( "ColoreStateMachine.loadFragment -> " + fragmentFile );
		$("#ColoreFragment").load( fragmentFile ).attr( 'template', fragmentFile );
	} 
	
	this.service = function() {
		var context = this.getContext();
		
		console.log( "ColoreStateMachine.service: Detecting context: [" + context + "]" );

		this.dispatch( context );
	}
	
	this.dispatch = function( context, args ) {
		
		if( context == "" || context == false ) {
			this.dispatch( this.settings['default'] );
		} else if( context !== undefined ) {
			this.loadContext( context, args );
		} 
		
	}
	
	this.init();
}

function ColoreRequest() {
	
	this.setRequestProperty = function( requestPropertyName, requestPropertyValue ) {
		this.request_properties[requestPropertyName] = requestPropertyValue;
	}
}