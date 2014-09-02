/*
 * Scienceworld Domelights Render Daemon
 * Version: 0.0.2 
 */
var http = require( 'http' );
var fs = require( 'fs' );
var crypto = require('crypto');
var CryptoJS = require('crypto-js');

var THREE = require( 'three' );

var debug = fs.existsSync('debug');

if (debug)
	console.log('Starting in debug mode');

var epoch = function() {
	return Math.round(+new Date()/1000);
}

require( '../../domelights/variables.js' );
require( '../../domelights/lighting.js' );
require( '../../domelights/geometries.js' );
require( '../../domelights/createBrushes.js' );
require( '../../domelights/events.js' );
require( '../../domelights/init.js' );
require( '../../domelights/render.js' );
require( '../../domelights/renderPassSetup.js' );
require( '../../domelights/interface.js' );

require( '../../domelights/UI.js' );
require( '../../domelights/BRUSH.js' );
require( '../../domelights/LIGHT.js' );
require( '../../domelights/SEQUENCE.js' );

//initRendermode();


//---

var express = require('express');
var app = express();
var engine = require('ejs-locals');

app.use(express.json());
app.use(express.urlencoded());
app.engine('ejs', engine);
app.set('views', __dirname);
app.set('view engine', 'ejs');

var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});

app.post('/render', function(req, res) {
	timestamp = epoch();
	console.log( timestamp );
	console.log(CryptoJS.HmacSHA1("Message", "Key").toString());
	var api_request = 
//	res.send()
	console.log( req.files );
});