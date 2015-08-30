var url = __dirname + '/../../core/',
	Box2D = require('./box2d.js'),
	box2d = require(url + 'box2d.js'),
	Assassin = require(url + 'assassin.js'),
	Body = require(url + 'body.js'),
	Bullet = require(url + 'bullet.js'),
	Manager = require(url + 'manager.js'),
	WallsAndFloor = require(url + 'wallsAndFloor.js'),
	Map = require(url + 'map.js'),
	Socket = require('./socket.js'),
	Stage = require('./stage.js'),
	_ = require('underscore');


function Server (Box2D, box2d, Assassin, Body, Bullet, Manager, WallsAndFloor, Map, Socket, Stage) {
	this.Box2D = Box2D;
	this.box2d = box2d;
	this.Assassin = Assassin;
	this.Body = Body;
	this.Bullet = Bullet;
	this.Manager = Manager;
	this.WallsAndFloor = WallsAndFloor;
	this.Map = Map;
	this.Socket = Socket;
	this.Stage = stage;
}


module.exports = new Server(Box2D, box2d, Assassin, Body, Bullet, Manager, WallsAndFloor, Map, Socket, Stage);