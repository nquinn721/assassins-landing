if(typeof module !== 'undefined')
	var _ = require('underscore');


function Manager (box2d) {
	this.box2d = box2d;

	this.items = [];
	this.assassins = [];
	this.totalAssassins = 0;

	// Local User
	this.user;

	this.canvas = {
		width : 1200,
		height : 800
	}
}


Manager.prototype = {
	init : function () {
		this.box2d.init({ 
         	BeginContact : this.beginContact.bind(this)
      	});
	},
	handleKeyUp : function (obj) {
      	var assassin = this.getById(obj.obj.id);
      	assassin.handleKeyUp(obj);
   	},
   	handleKeyDown : function (obj) {
      	var assassin = this.getById(obj.obj.id);
      	assassin.handleKeyDown(obj); 
   	},
   	create : function (obj) {
   		this.items.push(obj);
   	},
	createUser : function (obj) {
		this.items.push(obj);
		this.assassins.push(obj);
		this.totalAssassins++;
		this.user = obj;
	},
	createAssassin : function (obj) {
		this.items.push(obj);
		this.assassins.push(obj);
		this.totalAssassins++;
	},
	destroyAssassin : function (obj) {
		this.removeItem(obj);
		this.removeAssassin(obj);
		this.totalAssassins--;
	},
	removeAssassin : function (obj) {
		this.assassins.splice(this.assassins.indexOf(obj), 1);
	},
	removeItem : function (obj) {
		this.items.splice(this.items.indexOf(obj), 1);
	},
	beginContact : function (contact) {
		var one = contact.GetFixtureA().GetBody().GetUserData(),
		  	two = contact.GetFixtureB().GetBody().GetUserData();
		one = this.getById(one.id);
		two = this.getById(two.id);


		if(one instanceof Array)one = one[0];
		if(two instanceof Array)two = two[0];


		if(one && one.contact && !one.hasContact){
			one.hasContact = true;
			one.contact(two);
		}
		if(two && two.contact && !two.hasContact){
			two.hasContact = true;
			two.contact(one);
		}

	},
	getById : function (id) {
		return _.findWhere(this.items, {id : id}) || _.filter(this.items, function(obj) {
	        if(obj.opts)
	            return obj.opts.id === id;
	     });
	},
	tick : function (cb) {
      	this.box2d.tick();
      	for(var i = 0; i < this.items.length; i++){
         	var item = this.items[i];
         	if(item.x > this.canvas.width || item.x + item.w < 0 || item.y > this.canvas.height || item.y + item.h < 0){
	            item.destroy();
	            this.removeItem(item);
         	}
        	if(item.tick)item.tick();
      	}

      	cb && cb();

   	}
}

if(typeof module !== 'undefined' && module.exports)
	module.exports = Manager;