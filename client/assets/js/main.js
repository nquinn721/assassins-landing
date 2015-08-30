var box2d = new B2D(Box2D, Body);
var manager = new Manager(box2d);
var view = new View(manager);
var socket = new Socket(box2d, Bullet, view);
var stage = new Stage(socket, manager, view);
WallsAndFloor(manager, stage, box2d);
socket.init(stage);
stage.init();
