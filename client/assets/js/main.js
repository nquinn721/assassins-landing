var box2d = new B2D(Box2D, Body);
var socket = new Socket(box2d, Bullet);
var stage = new Stage(socket);
socket.init(stage);
stage.init();




// Floor
box2d.rect({
   x : 0, 
   y : 380, 
   w : 800, 
   h : 20
});
// Left Wall
box2d.rect({
   x : 0, 
   y : 0, 
   w : 0, 
   h : 400
});
// Left Wall
box2d.rect({
   x : 800, 
   y : 0, 
   w : 0, 
   h : 400
});
// Ceiling
box2d.rect({
   x : 0, 
   y : 0, 
   w : 800, 
   h : 0
});


