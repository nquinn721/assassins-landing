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
	this.shootDirection = obj.shootDirection || 'right';
	this.linearDamping = 0;

	this.user = user;

	this.bullets = 0;
	this.frames = 0;

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
		var self = this;

		this.left && this.moveLeft();
		this.right && this.moveRight();
		this.frames++;

		this.x = this.body.getX();
		this.y = this.body.getY();

		if(this.jumping){
			this.jumping = false;
			this.jump();
		}

		if(this.shooting){
			this.shoot(); 
			this.shooting = false;	
		} 

		if(this.hp <= 0)
			this.destroy();

	},

	create : function (user) {
		this.body = this.box2d.rect(this.getObj());
	},
	setPosition : function (obj) {
		this.body.setX(obj.x);
		this.body.setY(obj.y);
	},
	moveRight : function () {
		this.body.move('right');
	},
	moveLeft : function () {
		this.body.move('left');
	},
	jump : function () {
		if(this.jumpAvailable){
			this.jumpAvailable = false;
			this.body.applyImpulse('up', 3);
			
		}

	},
	duck : function () {
		
	},
	shoot : function () {
		this.bullets++;
		var x = this.shootDirection === 'right' ? this.getX() + this.w + 10 : this.getX() - 20;
		var bullet = new this.Bullet(this.box2d, {
		   	x : x,
		   	y : this.getY() + (this.h / 2), 
		   	w : 10, 
		   	h : 10,
	   		id : this.bullets,
	   		direction : this.shootDirection
		});
		bullet.init();
		bullet.shoot();
		this.stage.create(bullet);
	},
	contact : function (item) {
		var id = null, self = this;
		
		if(item){
			id = item.id ? item.id : item.opts.id;
		}

		if(id){

			if(id.match('Bullet')){
				this.hp -= 10;
			}

			if(id.match('Floor')){
				setTimeout(function () {
					self.jumpAvailable = true;
				}, 300);
			}
		}

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
			shootDirection : this.shootDirection,
			type : this.type,
			linearDamping : this.linearDamping
		};
	},
	handleKeyUp : function (e) {
		this.keyUp(e.keyCode);
	},
	handleKeyDown : function (e) {
		this.keyDown(e.keyCode);
	},
	keyDown : function (keyCode) {
		var key = this.keys(keyCode);

		if(key === 'jumping'){
			if(this.jumpAvailable)
				this[key] = true;
		}else{
			this[key] = true;
		}
	},
	keyUp : function (keyCode) {
		var key = this.keys(keyCode);

		if(key === 'jumping'){
			// this[key] = false;
		}else{
			this[key] = false;
		}
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
