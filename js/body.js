function Body (bodyFixture, opts) {
	this.body = bodyFixture;
	this.SCALE = 30;
	this.speed = opts && opts.speed ? opts.speed : 5;
}

Body.prototype = {
	getX : function () {
		return this.body.GetPosition().x ;
	},
	getY : function () {
		return this.body.GetPosition().y ;
	},
	left : function () {
		this.move('left')
	},
	right : function () {
		this.move('right');
	},
	move : function (dir) {
		var x = this.getX() * this.SCALE;
		if(dir === 'left')
			this.body.SetPosition({x : (x - this.speed) / this.SCALE, y : this.getY()});
		else this.body.SetPosition({x : (x + this.speed) / this.SCALE, y : this.getY()});

		
		if(!this.body.IsAwake())
			this.body.SetAwake(true);
	}
}