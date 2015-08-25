function Body (bodyFixture, opts) {
	this.body = bodyFixture;
	this.SCALE = 30;
	this.speed = opts && opts.speed ? opts.speed : 5;
}

Body.prototype = {
	getX : function () {
		return this.body.GetPosition().x * this.SCALE;
	},
	getY : function () {
		return this.body.GetPosition().y * this.SCALE;
	},
	left : function () {
		this.move('left');
	},
	right : function () {
		this.move('right');
	},
	applyForce : function (dir, speed) {
		var vec;
		if(dir === 'right')
			vec = new b2Vec2((speed || this.speed) * this.SCALE, 0);
		if(dir === 'left')
			vec = new b2Vec2(-((speed || this.speed) * this.SCALE), 0);
		if(dir === 'down')
			vec = new b2Vec2(0, (speed || this.speed) * this.SCALE);
		if(dir === 'up')
			vec = new b2Vec2(0, -((speed || this.speed) * this.SCALE));

		this.body.ApplyForce( vec , this.body.GetPosition() )
	},
	move : function (dir) {
		var x = this.getX(),
			y = this.getY();

		if(dir === 'left')
			this.body.SetPosition({x : (x - this.speed) / this.SCALE, y : y / this.SCALE});
		else this.body.SetPosition({x : (x + this.speed) / this.SCALE, y : y / this.SCALE});

		
		if(!this.body.IsAwake())
			this.body.SetAwake(true);
	},
	beginContact : function (contact, manifold) {
		
	}
}