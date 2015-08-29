
function Stage (socket, manager) {
   this.socket = socket;
   this.manager = manager;


   this.stage = new createjs.Stage(document.getElementById('game'));
   this.assassins = 0;
   this.items = [];

   this.view = {
      width : 800,
      height : 400
   };

   this.currentx = 0;
   this.currenty = 0;

   this.canvasElement = $('canvas');

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
      this.socket.on('destroyAssassin', this.manager.removeAssassin.bind(this.manager)); 
   },
   keyUp : function (e) {
      this.socket.emit('keyUp', {id : this.manager.user.id, keycode : e.keyCode});
   },
   keyDown : function (e) {
      this.socket.emit('keyDown', {id : this.manager.user.id, keycode : e.keyCode});
   },

   followUser : function () {
      if(!this.manager.user)return;

      var viewWidth = this.view.width,
         viewHeight = this.view.height,
         canvasWidth = this.manager.canvas.width,
         canvasHeight = this.manager.canvas.height,
         user = this.manager.user,
         canvas = this.canvasElement;

      // Move canvas right
      if(user.x > viewWidth / 2 && user.right && user.x.toFixed() > this.currentx.toFixed() && user.x + viewWidth / 2 < canvasWidth)
         canvas.css('left', -(user.x - viewWidth / 2));
      // Move canvas left
      else if(user.left && user.x > viewWidth / 2 && user.x.toFixed() < this.currentx.toFixed() && user.x < canvasWidth - (viewWidth / 2))
         canvas.css('left', -(user.x - viewWidth / 2) + 15);
      // Move canvas up and down
      if(user.y > viewHeight / 2 && user.y.toFixed() !== this.currenty.toFixed() && user.y < canvasHeight - viewHeight / 2)
         canvas.css('top', -(user.y - viewHeight / 2) - 25);

      this.currenty = user.y;
      this.currentx = user.x;

   },

   updateCanvasElement : function () {
   },
   
   tick : function () {
      this.followUser();
      // this.stage.update();
   }
}
