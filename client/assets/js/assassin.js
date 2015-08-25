function Assassin (stage, obj) {
	this.stage = stage;

	this.x = 10;
	this.y = 300;
	this.h = 80;
	this.w = 40;
	this.speed = 5;
	this.type = 'dynamic';
	this.id = 'Assassin';
	this.hp = 100;

	if(obj)
		for(var i in obj)this[i] = obj[i];

	// Movement
	this.left;
	this.right;
	this.shooting;
	this.jumpAvailable = true;

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

		if(this.jumping && this.jumpAvailable){
			this.jump();
			// this.jumpAvailable = false;
		}

		if(this.shooting){
			this.shoot(); 
			this.shooting = false;	
		} 
	},
	registerKeyDown : function () {
		$(document).on('keydown.assassin', this.keyDown.bind(this));
	},
	registerKeyUp : function () {
		$(document).on('keyup.assassin', this.keyUp.bind(this));
	},
	create : function () {
		this.body = box2d.rect(this.getObj());
		this.stage.create(this);
	},
	moveRight : function () {
		this.body.right();
	},
	moveLeft : function () {
		this.body.left();
	},
	jump : function () {
		this.body.applyForce('up', 10);
	},
	duck : function () {
		
	},
	shoot : function () {
		var bullet = new Bullet({
		   	x : this.getX() + this.w + 10, 
		   	y : this.getY() + (this.h / 2), 
		   	w : 10, 
		   	h : 10,
	   		type : 'dynamic',
	   		id : 1
		});
		bullet.init();
		stage.create(bullet);
		bullet.shoot();
	},
	contact : function (item) {
		if(item && item.id.match('Bullet'))
			this.hp -= 10;

		if(this.hp <= 0)
			this.destroy();
	},
	destroy : function () {
		alert('You died');
	},
	getX : function () {
		return this.body.getX() - (this.w / 2);
	},
	getY : function () {
		return this.body.getY() - (this.h / 2);
	},
	getObj : function () {
		return {
			id : this.id,
			x : this.x, 
			y : this.y, 
			w : this.w, 
			h : this.h, 
			speed : this.speed, 
			type : this.type
		};
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
			38 : 'jumping',
			39 : 'right',
			40 : 'duck',
			32 : 'shooting'
		}
		return keys[key];
	}
}

