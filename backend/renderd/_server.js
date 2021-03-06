//---


XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var $ = jQuery = require('./jquery.js')(window);

var debug = fs.existsSync('debug');

if (debug) console.log('Starting in debug mode');

var epoch = function() {
	return Math.round(+new Date()/1000);
}

//---

initRendermode();

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
	if (debug) console.log( timestamp,": Processing render request" );
//	console.log(CryptoJS.HmacSHA1("Message", "Key").toString());
//	res.send()
	if (debug) console.log( req.body.sequence );
	var result_set = {
			result: "ERROR",
	};
	if( req.body.sequence ) {
		result_set['result'] = "OK";
		result_set['sequence'] = SequenceManager.RenderSequence( req.body.sequence ).toString( 'base64' );
		if (debug) console.log( 'sequence: ' + result_set['sequence'] );
	}
	res.send( JSON.stringify( result_set ) );
});

//var BinarySequenceStream = SequenceManager.RenderSequence(JSONSequenceConstructionFile);
/*
   This is information for live update
   -----------------------------------
 var STREAM = SequenceManager.RenderFrame(FrameToStream,true);

 */
