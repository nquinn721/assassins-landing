function Assassin () {
	this.x = 10;
	this.y = 300;
	this.h = 80;
	this.w = 40;
	this.speed = 5;
	this.type = 'dynamic';

	// Movement
	this.left = undefined;
}

Assassin.prototype = {
	init : function () {
		this.registerKeyDown();
		this.registerKeyUp();
		this.create();
	},
	tick : function () {
		this.left && this.moveLeft();
		this.right && this.moveRight();
	},
	registerKeyDown : function () {
		$(document).on('keydown.assassin', this.keyDown.bind(this));
	},
	registerKeyUp : function () {
		$(document).on('keyup.assassin', this.keyUp.bind(this));
	},
	create : function () {
		this.body = box2d.rect(this.getObj());
	},
	moveRight : function () {
		this.x++;
		this.body.right();
	},
	moveLeft : function () {
		this.x--;
		this.body.left();
	},
	jump : function () {
		
	},
	duck : function () {
		
	},
	getObj : function () {
		return {
			x : this.x, 
			y : this.y, 
			w : this.w, 
			h : this.h, 
			options : {
				speed : this.speed, 
				type : this.type
			}
		}
	},
	keyDown : function (e) {
		this[this.keys(e.keyCode)] = true;
	},
	keyUp : function (e) {
		this[this.keys(e.keyCode)] = false;
	},
	keys : function (key) {
		var keys = {
			37 : 'left',
			38 : 'jump',
			39 : 'right',
			40 : 'duck'
		}
		return keys[key];
	}
}

