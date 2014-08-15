var http = require( 'http' );
var fs = require( 'fs' );
var crypto = require('crypto');

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

var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});

app.post('/render', function(req, res) {
//	res.send()
	console.log( req.files );
});