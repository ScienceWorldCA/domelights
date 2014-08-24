/*
 * Scienceworld Domelights Render Daemon
 * Version: 0.0.2 
 */
var http = require( 'http' );
var fs = require( 'fs' );
var crypto = require('crypto');
var CryptoJS = require('crypto-js');

var debug = fs.existsSync('debug');

if (debug)
	console.log('Starting in debug mode');

// ---

var express = require('express');
var app = express();
var engine = require('ejs-locals');

app.use(express.json());
app.use(express.urlencoded());
app.engine('ejs', engine);
app.set('views', __dirname);
app.set('view engine', 'ejs');

var epoch = function() {
	return Math.round(+new Date()/1000);
}

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
