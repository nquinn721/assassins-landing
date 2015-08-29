
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
   createFloor : function (obj) {
      this.manager.createFloor(obj);
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
   updatePosition : function (obj) {
      this.manager.updatePosition(obj);
   },
   destroy : function () {
      $('.die').show();
   },
   followUser : function () {
      if(!this.manager.user)return;

      var viewWidth = this.view.width,
         viewHeight = this.view.height,
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
      // this.stage.update();
   }
}
