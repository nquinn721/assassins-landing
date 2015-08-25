var stage = new Stage();
var assassin = new Assassin(stage);
assassin.init();
stage.init();

var socket = new Socket();
socket.init();

socket.emit('assassin', {
   id : 'assassin1',
   x : 500, 
   y : 300, 
   w : 40, 
   h : 80, 
   speed : 5
});

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


