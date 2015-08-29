var url = __dirname + '/../../client/assets/js/',
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
   	this.totalAsassins = 0;
   	this.items = [];
   	this.assassins = [];
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
		WallsAndFloor(this, box2d);
		manager.init();
		this.ticker();
		
	},
	login : function (io, socket) {
		var assassin;
		this.totalAsassins++;

		if(this.assassins.length === 1){
			x = Math.random() * 200;
		}else {
			x = Math.random() * 200 + (manager.canvas.width - 200);

		}
		assassin = new Assassin(this, Bullet, box2d, {id : 'Assassin' + this.totalAsassins, x : x, y : 10});
		assassin.init();

		this.assassins.push(assassin);
		this.items.push(assassin);
		
		if(this.assassins.length === 2)
			assassin.directionFacing = 'left';

		socket.assassin = assassin;

		socket.emit('userAssassin', assassin.getObj());
		socket.broadcast.emit('newAssassin', assassin.getObj());

		for(var i = 0; i < this.assassins.length; i++)
			if(this.assassins[i].id !== assassin.id)
				socket.emit('newAssassin', this.assassins[i].getObj());

		this.map.sendFloors();


	},
	beginContact : function (contact) {
		var one = contact.GetFixtureA().GetBody().GetUserData(),
		  	two = contact.GetFixtureB().GetBody().GetUserData();
		one = this.getById(one.id);
		two = this.getById(two.id);


		if(one && one.contact && !one.hasContact){
			one.hasContact = true;
			one.contact(two);
		}
		if(two && two.contact && !two.hasContact){
			two.hasContact = true;
			two.contact(one);
		}

	},
	logout : function (id) {
		var item = this.getById(id);
		this.destroy(item);
	},
	destroy : function (item) {
	  	this.items.splice(this.items.indexOf(item), 1);
	  	this.assassins.splice(this.assassins.indexOf(item), 1);
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
		
	},
	ticker : function () {
		var self = this;
		this.interval = setInterval(function () {
			manager.tick(self.tick.bind(self));
		}, 1000 / 60);
	},
	getById : function (id) {
	  return _.findWhere(this.items, {id : id});
	},
	tick : function () {
	    if(this.frames % 1000 === 0)
	    	this.updateClientPositions();

	},
	updateClientPositions : function () {
		for(var i = 0; i < this.items.length; i++){
			var obj = this.items[i].getObj();
			// this.io.emit('updatePosition', obj);
		}
	}
}


// Floor
var floor = box2d.rect({
   x : 0, 
   y : 380, 
   w : 800, 
   h : 20,
   id : 'Floor'
});
// Left Wall
var leftwall = box2d.rect({
   x : 0, 
   y : 0, 
   w : 0, 
   h : 400,
});
// Right Wall
var rightwall = box2d.rect({
   x : 800, 
   y : 0, 
   w : 0, 
   h : 400,
});
// Ceiling
var ceiling = box2d.rect({
   x : 0, 
   y : 0, 
   w : 800, 
   h : 0,
});


module.exports = Stage;
