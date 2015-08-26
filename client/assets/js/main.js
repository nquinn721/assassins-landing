var stage = new Stage();
var socket = new Socket();
socket.init();
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


