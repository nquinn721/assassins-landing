function Assassin (stage, bullet, box2d, obj, user) {
	this.stage = stage;
	this.box2d = box2d;
	this.Bullet = bullet;

	this.x = obj.x || Math.random() * canvas.width / 2 + canvas.width / 2;
	this.y = obj.y || Math.random() * canvas.height;		

	this.h = obj.h || 80;
	this.w = obj.w || 40;
	this.speed = obj.speed || 5;
	this.type = obj.type || 'dynamic';
	this.id = obj.id || 'Assassin';
	this.hp = obj.hp || 100;

	this.user = user;

	this.bullets = 0;

	// Movement
	this.left;
	this.right;
	this.shooting;
	this.jumpAvailable = true;

}

Assassin.prototype = {
	init : function () {
		this.create();
	},
	tick : function () {
		this.left && this.moveLeft();
		this.right && this.moveRight();

		this.x = this.body.getX();
		this.y = this.body.getY();

		if(this.jumping && this.jumpAvailable){
			this.jump();
			// this.jumpAvailable = false;
		}

		if(this.shooting){
			this.shoot(); 
			this.shooting = false;	
		} 
	},

	create : function (user) {
		this.body = this.box2d.rect(this.getObj());
	},
	setPosition : function (obj) {
		console.log(obj.x);
		this.body.setX(obj.x);
		this.body.setY(obj.y);
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
		this.bullets++;

		var bullet = new this.Bullet(this.box2d, {
		   	x : this.getX() + this.w + 10, 
		   	y : this.getY() + (this.h / 2), 
		   	w : 10, 
		   	h : 10,
	   		id : this.bullets
		});
		bullet.init();
		bullet.shoot();
	},
	contact : function (item) {
		if(item && item.id.match('Bullet')){
			this.hp -= 10;
			console.log(this.hp);
		}

		if(this.hp <= 0)
			this.destroy();

		this.hasContact = false;

	},
	destroy : function (obj) {
		this.body.destroy();
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
	handleKeyUp : function (e) {
		this.keyUp(e.keyCode);
	},
	handleKeyDown : function (e) {
		this.keyDown(e.keyCode);
	},
	keyDown : function (keyCode) {
		this[this.keys(keyCode)] = true;
	},
	keyUp : function (keyCode) {
		this[this.keys(keyCode)] = false;
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


if (typeof module !== "undefined" && module.exports)
	module.exports = Assassin;
