
function Stage () {
   this.stage = new createjs.Stage(document.getElementById('game'));
}

Stage.prototype = {
   init : function () {
      box2d.init();
      this.ground();
      this.ticker();
   },
   ground : function () {
      box2d.rect(0, 380, 800, 20);
      box2d.rect(100, 200, 100, 50, {type : 'dynamic'});
   },
   setupPhysics : function () {
   },
   ticker : function () {
      createjs.Ticker.addEventListener('tick', this.tick);
      createjs.Ticker.setFPS(60);
      createjs.Ticker.useRAF = true;
   },
   tick : function () {
      box2d.tick();
      // this.stage.update();
   }
}

var stage = new Stage();
stage.init();