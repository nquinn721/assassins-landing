
function WallsAndFloor (stage, box2d) {
   // Floor
   var floor = box2d.rect({
      x : 0, 
      y : manager.canvas.height - 20, 
      w : manager.canvas.width, 
      h : 20,
      id : 'Floor'
   });
   // Left Wall
   var leftwall = box2d.rect({
      x : 0, 
      y : 0, 
      w : 0, 
      h : manager.canvas.height,
   });
   // Right Wall
   var rightwall = box2d.rect({
      x : manager.canvas.width, 
      y : 0, 
      w : 0, 
      h : manager.canvas.height,
   });
   // Ceiling
   var ceiling = box2d.rect({
      x : 0, 
      y : 0, 
      w : manager.canvas.width, 
      h : 0,
   });
   stage.create(floor);

}

if(typeof module !== 'undefined' && module.exports)
   module.exports = WallsAndFloor;
