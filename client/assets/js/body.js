function Body (bodyFixture, b2Vec2, opts) {
	this.body = bodyFixture;
	this.SCALE = 30;
	this.speed = opts && opts.speed ? opts.speed : 5;
	this.b2Vec2 = b2Vec2;
	this.opts = opts;

}

Body.prototype = {
	getX : function () {
		return this.body.GetPosition().x * this.SCALE;
	},
	getY : function () {
		return this.body.GetPosition().y * this.SCALE;
	},
	setX : function (x) {
		this.body.SetPosition({x : x / this.SCALE, y : this.getY() / this.SCALE});
	},
	setY : function (y) {
		this.body.SetPosition({x : this.getX() / this.SCALE, y : y / this.SCALE});
	},
	left : function () {
		this.move('left');
	},
	right : function () {
		this.move('right');
	},
	updateXYFromServer : function (x, y) {
		this.setX(x);
		this.setY(y);	
	},
	applyForce : function (dir, speed) {
		var vec;
		if(dir === 'right')
			vec = new this.b2Vec2((speed || this.speed) * this.SCALE, 0);
		if(dir === 'left')
			vec = new this.b2Vec2(-((speed || this.speed) * this.SCALE), 0);
		if(dir === 'down')
			vec = new this.b2Vec2(0, (speed || this.speed) * this.SCALE);
		if(dir === 'up')
			vec = new this.b2Vec2(0, -((speed || this.speed) * this.SCALE));

		this.body.ApplyForce( vec , this.body.GetPosition() );

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

	destroy : function (cb) {
		var self = this;
		setTimeout(function () {
			self.body.GetWorld().DestroyBody(self.body);
		}, 0);
	}
}

if (typeof module !== "undefined" && module.exports)
	module.exports = Body;