function Socket () {
	this.io = io.connect();
}

Socket.prototype = {
	init : function () {
		this.emit('login');
		this.setupListeners();
	},
	setupListeners : function () {
		this.on('createAssassin', this.createAssassin.bind(this));
		this.on('newAssassin', this.newAssassin.bind(this));
	},
	createAssassin : function (obj) {
		var assassin = new Assassin(this, stage, obj);
		assassin.init();
	},
	newAssassin : function (id) {
	   var assassin = new Assassin(this, stage);
	   assassin.init(id);
	   this.emit('assassin', assassin.getObj());
	},
	emit : function (event, data) {
		this.io.emit(event, data);
	},
	on : function (event, cb) {
		this.io.on(event, cb);
	}
}