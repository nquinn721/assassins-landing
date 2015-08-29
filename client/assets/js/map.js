function Map (box2d, manager, io) {
	this.manager = manager;
	this.box2d = box2d;
	this.io = io;
	this.floors = [];
	this.created = false;
}

Map.prototype = {
	init : function () {
		if(!this.created)
			this.create();
	},
	create : function () {
		for(var i = 0; i < 10; i++){
			var obj = {
		         x : Math.random() * manager.canvas.width,
		         y : Math.random() * manager.canvas.height,
		         w : 200,
		         h : 20,
		         id : 'Floor'
      		};
      		this.floors.push(obj);

		}
		this.created = true;

	},
	sendFloors : function () {
		for(var i = 0; i < this.floors.length; i++)
			this.sendToClient(this.floors[i]);	
	},
	sendToClient : function (obj) {
	    this.box2d.rect(obj);
		this.io.emit('createFloor', obj);
	}

}

if(typeof module !== 'undefined' && module.exports)
	module.exports = Map;