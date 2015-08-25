function Socket () {
	this.io = io.connect();
}

Socket.prototype = {
	init : function () {
		this.setupListeners();
	},
	setupListeners : function () {
		this.on('createAssassin', this.createAssassin.bind(this));
	},
	createAssassin : function (obj) {
		console.log('creating assassin', obj);
		var assassin = new Assassin(stage, obj);
		assassin.init();
	},
	emit : function (event, data) {
		this.io.emit(event, data);
	},
	on : function (event, cb) {
		this.io.on(event, cb);
	}
}