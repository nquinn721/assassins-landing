
function Stage () {
   this.stage = new createjs.Stage(document.getElementById('game'));
   this.items = [];
}

Stage.prototype = {
   init : function () {
      box2d.init();
      this.createB2D();
      this.ticker();
   },
   create : function (obj) {
      this.items.push(obj);
   },
   createB2D : function () {
      // for(var i = 0; i < this.items.length; i++)
         // box2d.rect(this.items[i]); 
   },
   setupPhysics : function () {
   },
   ticker : function () {
      createjs.Ticker.addEventListener('tick', this.tick.bind(this));
      createjs.Ticker.setFPS(60);
      createjs.Ticker.useRAF = true;
   },
   tick : function () {
      box2d.tick();
      for(var i = 0; i < this.items.length; i++)
         this.items[i].tick();
      // this.stage.update();
   }
}
var assassin = new Assassin();
var stage = new Stage();
box2d.rect({
   x : 0, 
   y : 380, 
   w : 800, 
   h : 20
});
stage.create(assassin);
assassin.init();
stage.init();