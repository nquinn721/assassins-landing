function Socket (box2d, bullet, view) {
	this.box2d = box2d;
	this.io = io.connect();
	this.bullet = bullet;
	this.view = view;
}

Socket.prototype = {
	init : function (stage) {
		this.stage = stage;
		this.emit('login');
		this.setupListeners();
		this.view.init(this);
	},
	setupListeners : function () {
		this.on('newAssassin', this.newAssassin.bind(this));
		this.on('userAssassin', this.userAssassin.bind(this));
		this.on('updatePosition', this.updateObjectPositions.bind(this));
		this.on('createFloor', this.createFloor.bind(this));
	},
	updateObjectPositions : function (obj) {
		if(this.stage)
			this.stage.updatePosition(obj);
	},
	userAssassin : function (obj) {
		var assassin = new Assassin(stage, this.bullet, this.box2d, obj, true);	
		assassin.init();
		this.stage.createUser(assassin);
		this.view.focus(assassin.getObj());
	},
	createMap : function (obj) {
		this.stage.createMap(obj);
	},
	newAssassin : function (obj) {
	   var assassin = new Assassin(stage, this.bullet, this.box2d, obj);
	   assassin.init();
	   this.stage.createAssassin(assassin);
	},
	emit : function (event, data) {
		console.log(event);
		this.io.emit(event, data);
	},
	on : function (event, cb) {
		this.io.on(event, cb);
	}
}