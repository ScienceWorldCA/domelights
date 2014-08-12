var fs = require('fs');

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

app.get('/show', function(req, res) {
	res.render('set', {
		latest : latest
	});
});

app.post('/show', function(req, res) {
	var url = req.body.url;
	latest = url;
	res.redirect("/show");
});

app.get('/', function(req, res) {

	res.render('display', {
		latest : latest
	});

});

app.get('/latest', function(req, res) {
	res.send(latest);
});