function Socket (io) {
	this.io = io;
}

Socket.prototype = {
	init : function (stage) {
		this.stage = stage;
	},
	ioEvents : function () {
		
	},
	socketEvents : function (socket) {
		
	}
}

module.exports = Socket;