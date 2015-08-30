function View (manager) {
	this.manager = manager;
    this.width = 800;
    this.height = 400;

   	this.canvasElement = $('canvas');

   	this.resetMap = $('.reset input');
}

View.prototype = {
	init : function (socket) {
		this.socket = socket;	
	},
	focus : function (user) {
		this.canvasElement.css('left', -(user.x - this.width / 2));

		var left = Math.abs(parseInt(this.canvasElement.css('left')));

		if(left + this.width > this.manager.canvas.width)
			this.canvasElement.css('left', -(this.manager.canvas.width - this.width));

		this.setupEvents();
	},
	setupEvents : function () {
		var self = this;
		this.resetMap.on('click', function () {
			self.socket.emit('mapReset');
		});
	},
	followUser : function () {
      	if(!this.manager.user)return;

		var viewWidth = this.width,
			viewHeight = this.height,
			canvasWidth = this.manager.canvas.width,
			canvasHeight = this.manager.canvas.height,
			user = this.manager.user,
			canvas = this.canvasElement,
			top = Math.abs(parseInt(canvas.css('top')));

		// Move canvas left and right
		if(user.x > viewWidth / 2 && user.x  < canvasWidth - (viewWidth / 2))
		 	canvas.css('left', -(user.x - viewWidth / 2));
		// Move canvas up and down
		if(user.y + user.h > viewHeight / 2 && user.y < canvasHeight - viewHeight / 2)
		   	canvas.css('top', -(user.y - viewHeight / 2));
   	},
   	tick : function () {
   		this.followUser();
   	}
}