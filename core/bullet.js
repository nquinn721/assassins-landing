function Bullet(box2d, obj) {
	this.box2d = box2d;
	this.x = obj.x || 10;
	this.y = obj.y || 10;
	this.w = obj.w || 10;
	this.h = obj.h || 10;
	this.direction = obj.direction || 'right';
	this.type = 'kinematic';
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
	setPosition : function (obj) {
		this.body.setX(obj.x);
		this.body.setY(obj.y);
	},
	create : function () {
		this.body = this.box2d.rect(this.getObj());
	},
	shoot : function () {
		this.body.right();
	},
	contact : function () {
		var self = this;
		this.body.destroy(function () {
			self.hasContact = false;
		});	
		// stage.destroy(this);
	},
	tick : function () {
		if(this.direction === 'right')
			this.body.right();
		else this.body.left();

		this.x = this.body.getX();
		this.y = this.body.getY();
	},
	destroy : function () {
		this.body.destroy();
	}
}

if (typeof module !== "undefined" && module.exports)
	module.exports = Bullet;