var express = require('express'),
	app = express(),
	io = require('socket.io').listen(app.listen(process.env.PORT || 3000)),
	jade = require('jade'),
	_ = require('underscore'),
	stage = require('./server/lib/stage.js');

stage = new stage(io);
stage.init();

app.use(express.static(__dirname + '/client/assets'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/client/');

app.get('/game', function (req, res) {
	res.render('game');
});

app.get('/', function (req, res) {
	res.render('index');
});



io.on('connection', function (socket) {
	
	stage.setupSocketListeners(socket);

	socket.on('setupCanvas', function (obj) {
		stage.initCanvas(obj);
	});

	socket.on('login', function () {
		stage.login(io, socket);
	});
	socket.on('disconnect', function () {
		if(socket.assassin){
			stage.logout(socket.assassin.id);
			io.emit('destroyAssassin', socket.assassin.getObj());
		}
	});
});