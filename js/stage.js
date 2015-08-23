var canvas = document.getElementById('game');
canvas.width = 800;
canvas.height = 400;

function Stage () {
   this.stage = new createjs.Stage(document.getElementById('game'));
}

Stage.prototype = {
   ground : function () {
      box2d.rect(200, 400, 200, 10);
   },
   setupPhysics : function () {
   },
   ticker : function () {
      // createjs.Ticker.addListener(this);
      // createjs.Ticker.setFPS(60);
      // createjs.Ticker.useRAF = true;
      box2d.tick();
   },
   tick : function () {
      
   }
}

var stage = new Stage();
stage.ground();
box2d.debugDraw(stage.stage);
stage.ticker();
