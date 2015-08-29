
function Stage (socket) {
   this.socket = socket;
   this.stage = new createjs.Stage(document.getElementById('game'));
   this.assassins = 0;
   this.items = [];

   this.user;
}

Stage.prototype = {
   init : function () {
      box2d.init({
         BeginContact : this.beginContact.bind(this)
      });
      this.setupSocketEvents();
      this.ticker();
   },

   setupKeyEvents : function () {
      var self = this;
       $(document).on('keydown', function (e) {
         self.user.handleKeyDown(e);
         self.keyDown(e);
      });
      $(document).on('keyup', function(e){
         self.user.handleKeyUp(e);
         self.keyUp(e);
      });
   },
   beginContact : function (contact) {
      var one = contact.GetFixtureA().GetBody().GetUserData(),
          two = contact.GetFixtureB().GetBody().GetUserData();
      one = this.getById(one.id);
      two = this.getById(two.id);


      if(one && one.contact && !one.hasContact){
         one.hasContact = true;
         one.contact(two);
      }
      if(two && two.contact && !two.hasContact){
         two.hasContact = true;
         two.contact(one);
      }

   },
   destroy : function (item) {
      this.items.splice(this.items.indexOf(item), 1);
   },
   createUser : function (obj) {
      this.user = obj;
      this.assassins++;
      this.items.push(obj);
      this.setupKeyEvents();
   },
   create : function (obj, user) {
      this.items.push(obj);
      this.assassins++;
   },
   ticker : function () {
      createjs.Ticker.addEventListener('tick', this.tick.bind(this));
      createjs.Ticker.setFPS(60);
      createjs.Ticker.useRAF = true;
   },
   setupSocketEvents : function () {
      this.socket.on('keyUp', this.handleKeyUp.bind(this));
      this.socket.on('keyDown', this.handleKeyDown.bind(this));
      this.socket.on('destroyAssassin', this.destroy.bind(this)); 
   },
   keyUp : function (e) {
      this.socket.emit('keyUp', {id : this.user.id, keycode : e.keyCode});
   },
   keyDown : function (e) {
      this.socket.emit('keyDown', {id : this.user.id, keycode : e.keyCode});
   },
   handleKeyUp : function (obj) {
      var assassin = this.getById(obj.obj.id);
      assassin.handleKeyUp(obj);
   },
   handleKeyDown : function (obj) {
      var assassin = this.getById(obj.obj.id);
      assassin.handleKeyDown(obj); 
   },
   destroy : function (obj) {
      var item = this.getById(obj.id);
      item.destroy();
      this.items.splice(this.items.indexOf(item), 1);
   },
   updatePosition : function (obj) {
      var assassin = this.getById(obj.id);
      if(assassin)
         assassin.setPosition(obj);
   },
   getById : function (id) {
      return _.findWhere(this.items, {id : id});
   },
   tick : function () {
      box2d.tick();
      for(var i = 0; i < this.items.length; i++)
         if(this.items[i].tick)this.items[i].tick();
      // this.stage.update();
   }
}
