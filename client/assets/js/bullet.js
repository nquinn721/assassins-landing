function Bullet(obj) {
	this.x = obj.x || 10;
	this.y = obj.y || 10;
	this.w = obj.w || 10;
	this.h = obj.h || 10;
	this.type = obj.type || 'dynamic';
	this.id = 'Bullet' + (obj.id || '');
	this.speed = obj.speed || 8;
}

Bullet.prototype = {
	init : function  () {
		this.create();
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
	create : function () {
		this.body = box2d.rect(this.getObj());
	},
	shoot : function () {
		this.body.applyForce('right', 10);
	},
	contact : function () {
		var self = this;
		this.body.destroy(function () {
			self.hasContact = false;
		});	
		// stage.destroy(this);
	},
	tick : function () {
		// this.body.right();
	}
}