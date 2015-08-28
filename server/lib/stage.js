var url = __dirname + '/../../client/assets/js/',
	Box2D = require('./box2d.js'),
	box2d = require(url + 'box2d.js'),
	Assassin = require(url + 'assassin.js'),
	Body = require(url + 'body.js'),
	Bullet = require(url + 'bullet.js'),
	_ = require('underscore');



box2d = new box2d(Box2D, Body);


function Stage (io) {
	this.io = io;
   	this.totalAsassins = 0;
   	this.items = [];
   	this.assassins = [];
   	this.frames = 0;
}

Stage.prototype = {
	init : function () {
		var self = this;
		box2d.init({
		 	BeginContact : this.beginContact.bind(this)
		});
		this.ticker();
		this.interval = setInterval(function () {
			self.tick();
		}, 1000 / 60);
	},
	login : function (io, socket) {
		var assassin = new Assassin(this, Bullet, box2d, {id : 'Assassin' + this.totalAsassins, x : Math.random() * 800, y : 10});
		assassin.init();

		this.assassins.push(assassin);
		this.items.push(assassin);

		this.totalAsassins++;
		socket.assassin = assassin;

		io.emit('userAssassin', assassin.getObj());

		for(var i = 0; i < this.assassins.length; i++)
			if(this.assassins[i].id !== assassin.id)
				socket.emit('newAssassin', this.assassins[i].getObj());

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
	  	this.items.push(obj);
	  	this.totalAsassins++;
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
	},
	getById : function (id) {
	  return _.findWhere(this.items, {id : id});
	},
	tick : function () {
	  	box2d.tick();
	  	for(var i = 0; i < this.items.length; i++)
	     	if(this.items[i].tick)this.items[i].tick();

	    this.frames++;


	    if(this.frames % 100 === 0)
	    	this.updateClientPositions();

	},
	updateClientPositions : function () {
		for(var i = 0; i < this.items.length; i++){
			console.log(this.items[i].getObj());

			this.io.emit('updatePosition', this.items[i].getObj())
		}
	}
}


// Floor
box2d.rect({
   x : 0, 
   y : 380, 
   w : 800, 
   h : 20
});
// Left Wall
box2d.rect({
   x : 0, 
   y : 0, 
   w : 0, 
   h : 400
});
// Left Wall
box2d.rect({
   x : 800, 
   y : 0, 
   w : 0, 
   h : 400
});
// Ceiling
box2d.rect({
   x : 0, 
   y : 0, 
   w : 800, 
   h : 0
});

module.exports = Stage;
