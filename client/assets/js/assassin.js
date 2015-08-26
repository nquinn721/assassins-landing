function Assassin (socket, stage, remote) {
	this.stage = stage;
	this.socket = socket;

	this.x = Math.random() * canvas.width / 2 + canvas.width;
	this.y = Math.random() * canvas.height;		

	this.h = 80;
	this.w = 40;
	this.speed = 5;
	this.type = 'dynamic';
	this.id = 'Assassin';
	this.hp = 100;
	this.remote = remote;

	this.bullets = 0;

	if(remote)
		for(var i in remote)this[i] = remote[i];

	// Movement
	this.left;
	this.right;
	this.shooting;
	this.jumpAvailable = true;

}

Assassin.prototype = {
	init : function (obj) {
		if(obj){
			this.id += obj.id;
			this.x = Math.random() * (canvas.width / 2) + (canvas.width / 2);
		}

		if(!this.remote){
			this.registerKeyDown();
			this.registerKeyUp();
		}
		this.registerSocketEvents();
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
		$(document).on('keydown.assassin', this.handleKeyDown.bind(this));
	},
	registerKeyUp : function () {
		$(document).on('keyup.assassin', this.handleKeyUp.bind(this));
	},
	registerSocketEvents : function () {
		if(this.remote){
			this.socket.on('destroyAssassin', this.destroy.bind(this));	
			this.socket.on('keyUp', this.keyUp.bind(this));
			this.socket.on('keyDown', this.keyDown.bind(this));
		}else{
		}
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
		this.bullets++;

		var bullet = new Bullet({
		   	x : this.getX() + this.w + 10, 
		   	y : this.getY() + (this.h / 2), 
		   	w : 10, 
		   	h : 10,
	   		type : 'dynamic',
	   		id : this.bullets
		});
		bullet.init();
		stage.create(bullet);
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
		this.socket.emit('keyUp', e.keyCode);
		this.keyUp(e.keyCode);
	},
	handleKeyDown : function (e) {
		this.socket.emit('keyDown', e.keyCode);
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

