var express = require('express'),
	app = express(),
	io = require('socket.io').listen(app.listen(3000)),
	jade = require('jade'),
	_ = require('underscore');


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
});


var assassins = {},
	totalAssassins = 0;

io.on('connection', function (socket) {

	socket.on('login', function () {
		var obj = {id : totalAssassins, x : false};
		totalAssassins++;

		console.log(totalAssassins);
		if(totalAssassins === 1)
			obj.x = true;

		socket.emit('newAssassin', obj);
	});

	socket.on('assassin', function (obj) {
		assassins[socket.id] = obj;
		socket.broadcast.emit('createAssassin', obj);

		for(var i in assassins)
			if(i !== socket.id)
				socket.emit('createAssassin', assassins[i]);
	});
	socket.on('keyUp', function (obj) {
		socket.broadcast.emit('keyUp', obj);
	});
	socket.on('keyDown', function (obj) {
		socket.broadcast.emit('keyDown', obj);
	});
	socket.on('logout', function () {
		// totalAssassins = _.size(assassins);
		totalAssassins--;
		socket.broadcast.emit('destroyAssassin', assassins[socket.id]);
		delete assassins[socket.id];
	});
});