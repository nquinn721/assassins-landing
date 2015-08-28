function Socket (box2d, bullet) {
	this.box2d = box2d;
	this.io = io.connect();
	this.bullet = bullet;
}

Socket.prototype = {
	init : function (stage) {
		this.stage = stage;
		this.emit('login');
		this.setupListeners();
	},
	setupListeners : function () {
		this.on('newAssassin', this.newAssassin.bind(this));
		this.on('userAssassin', this.userAssassin.bind(this));
		this.on('updatePosition', this.updateObjectPositions.bind(this));
	},
	updateObjectPositions : function (obj) {
		this.stage.updatePosition(obj);
	},
	userAssassin : function (obj) {
		var assassin = new Assassin(stage, this.bullet, this.box2d, obj, true);	
		assassin.init();
		this.stage.createUser(assassin);
	},
	newAssassin : function (obj) {
	   var assassin = new Assassin(stage, this.bullet, this.box2d, obj);
	   assassin.init();
	   this.stage.create(assassin);
	},
	emit : function (event, data) {
		this.io.emit(event, data);
	},
	on : function (event, cb) {
		this.io.on(event, cb);
	}
}