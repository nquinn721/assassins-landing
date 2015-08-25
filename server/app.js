var express = require('express'),
	app = express(),
	io = require('socket.io').listen(app.listen(3000)),
	jade = require('jade');


app.use(express.static(__dirname + '/../client/assets'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/../client/');

app.get('/game', function (req, res) {
	res.render('game');
});

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/assassin', function (req, res) {
	console.log(req);
	res.send('hi');
});



io.on('connection', function (socket) {
	socket.on('assassin', function (obj) {
		console.log(obj);
		io.emit('createAssassin', obj);
	});
});