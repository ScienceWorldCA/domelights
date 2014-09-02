/*
 * Scienceworld Domelights Render Daemon
 * Version: 0.0.2 
 */

// NPM packages

var http = require( 'http' );
var fs = require( 'fs' );
//var crypto = require('crypto');
//var CryptoJS = require('crypto-js');
var THREE = require( 'three' );
var jsdom = require("jsdom").jsdom;

htmlSource = fs.readFileSync( "../../domelights/dome.html", "utf8" );
document = jsdom( htmlSource );
window = document.parentWindow;

if( ! window.document ) {
	throw new Exception( "ERROR: Something went horribly wrong with JSDOM" );
}
