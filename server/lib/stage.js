var url = __dirname + '/../../core/',
	Box2D = require('./box2d.js'),
	box2d = require(url + 'box2d.js'),
	Assassin = require(url + 'assassin.js'),
	Body = require(url + 'body.js'),
	Bullet = require(url + 'bullet.js'),
	Manager = require(url + 'manager.js'),
	WallsAndFloor = require(url + 'wallsAndFloor.js'),
	Map = require(url + 'map.js'),
	_ = require('underscore');


box2d = new box2d(Box2D, Body);
manager = new Manager(box2d);

function Stage (io) {
	this.io = io;
   	this.frames = 0;

   	this.canvas = {
   		width : 3200,
   		height : 2400
   	}

   	this.map = new Map(box2d, manager, io);
   	this.map.init();
   	this.canvas;
}

Stage.prototype = {
	initCanvas : function () {
		
	},
	init : function () {
		WallsAndFloor(manager, this, box2d);
		manager.init();
		this.ticker();
		
	},
	login : function (io, socket) {
		var assassin;

		if(manager.assassins.length === 1){
			x = Math.random() * 200;
		}else {
			x = Math.random() * 200 + (manager.canvas.width - 200);

		}

		assassin = new Assassin(this, Bullet, box2d, {id : 'Assassin' + manager.totalAssassins, x : x, y : 10});
		assassin.init();
		manager.createAssassin(assassin);

		if(manager.assassins.length === 2)
			assassin.directionFacing = 'left';

		socket.assassin = assassin;

		socket.emit('userAssassin', assassin.getObj());
		socket.broadcast.emit('newAssassin', assassin.getObj());

		for(var i = 0; i < manager.assassins.length; i++)
			if(manager.assassins[i].id !== assassin.id)
				socket.emit('newAssassin', manager.assassins[i].getObj());

		this.map.sendFloors();


	},
	
	logout : function (assassin) {
		this.destroy(assassin);
	},
	destroy : function (item) {
		manager.destroyAssassin(item);
		this.io.emit('destroyAssassin', item.getObj());

	},
	create : function (obj) {
		manager.create(obj);
	},
	setupSocketListeners : function (socket) {
		socket.on('keyUp', function (obj) {
			if(socket.assassin){
				socket.assassin.keyUp(obj.keycode);
				socket.broadcast.emit('keyUp', {obj : socket.assassin.getObj(), keyCode : obj.keycode});
			}
		});		

		socket.on('keyDown', function (obj) {
			if(socket.assassin){
				socket.assassin.keyDown(obj.keycode);
				socket.broadcast.emit('keyDown', {obj : socket.assassin.getObj(), keyCode : obj.keycode});
			}
		});
		socket.on('mapReset', this.map.reset.bind(this.map));
		
	},
	ticker : function () {
		var self = this;
		this.interval = setInterval(function () {
			manager.tick(self.tick.bind(self));
		}, 1000 / 60);
	},
	tick : function () {
		
		this.frames++;
	    if(this.frames % 30 === 0)
	    	this.updateClientPositions();

	},
	updateClientPositions : function () {
		for(var i = 0; i < manager.items.length; i++){
			if(manager.items[i].getObj){
				var obj = manager.items[i].getObj();
				// this.io.emit('updatePosition', obj);
			}
		}
	}
}


module.exports = Stage;
