
function Stage (socket, manager, view) {
   this.socket = socket;
   this.manager = manager;
   this.view = view;


   this.stage = new createjs.Stage(document.getElementById('game'));
   this.assassins = 0;
   this.items = [];
  
   this.user;
}

Stage.prototype = {
   init : function () {
      this.manager.init();
      this.setupSocketEvents();
      this.ticker();
   },
   createUser : function (obj) {
      this.manager.createUser(obj);
      this.currentx = obj.x;
      this.currenty = obj.y;
      this.setupKeyEvents();
   },
   createAssassin : function (obj) {
     this.manager.createAssassin(obj); 
   },
   setupKeyEvents : function () {
      var self = this;
       $(document).on('keydown', function (e) {
         self.manager.user.handleKeyDown(e);
         self.keyDown(e);
      });
      $(document).on('keyup', function(e){
         self.manager.user.handleKeyUp(e);
         self.keyUp(e);
      });
   },

   create : function (obj) {
      this.manager.create(obj);
   },
   
   ticker : function () {
      var self = this;
      createjs.Ticker.addEventListener('tick', function () {
         self.manager.tick(self.tick.bind(self));
      });
      createjs.Ticker.setFPS(60);
      createjs.Ticker.useRAF = true;
   },
   setupSocketEvents : function () {
      this.socket.on('keyUp', this.manager.handleKeyUp.bind(this.manager));
      this.socket.on('keyDown', this.manager.handleKeyDown.bind(this.manager));
      this.socket.on('destroyAssassin', this.manager.destroyAssassin.bind(this.manager)); 
   },
   keyUp : function (e) {
      this.socket.emit('keyUp', {id : this.manager.user.id, keycode : e.keyCode});
   },
   keyDown : function (e) {
      this.socket.emit('keyDown', {id : this.manager.user.id, keycode : e.keyCode});
   },
   updatePosition : function (obj) {
      this.manager.updatePosition(obj);
   },
   destroy : function () {
      $('.die').show();
   },
   
   
   tick : function () {
      this.view.tick();
      this.stage.update();
   }
}
