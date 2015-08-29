var box2d = new B2D(Box2D, Body);
var manager = new Manager(box2d);
var socket = new Socket(box2d, Bullet);
var stage = new Stage(socket, manager);
WallsAndFloor(stage, box2d);
socket.init(stage);
stage.init();


