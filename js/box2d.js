var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


function B2D() {
   	this.SCALE = 30;
    this.world = new b2World(new b2Vec2(0, 50), true);
}

B2D.prototype = {
	init : function () {
		this.debugDraw();
	},
	rect : function (x, y, w, h, opts) {
		var fixDef = new b2FixtureDef();
		fixDef.restitution = 0;
		fixDef.density = opts && opts.density ? opts.density : 1;
		fixDef.friction = opts && opts.friction ? opts.friction : 0.5;
		var bodyDef = new b2BodyDef();
		bodyDef.type = opts && opts.type ? b2Body['b2_' + opts.type.toLowerCase() + 'Body'] : b2Body.b2_staticBody;
		bodyDef.position.x = ((x + w) - (w / 2)) / this.SCALE;
		bodyDef.position.y = (y + (h / 2)) / this.SCALE;

		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox((w / 2) / this.SCALE, (h / 2) / this.SCALE);
		this.world.CreateBody(bodyDef).CreateFixture(fixDef);
	},
	debugDraw : function () {
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(debug.getContext('2d'));
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetDrawScale(this.SCALE);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		this.world.SetDebugDraw(debugDraw);
	},
	tick : function () {
		this.world.DrawDebugData();
		this.world.Step(1/60, 10, 10);
		this.world.ClearForces();
	}
}


var box2d = new B2D();