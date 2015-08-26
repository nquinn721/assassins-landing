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
    this.world = world = new b2World(new b2Vec2(0, 70), true);
}

B2D.prototype = {
	init : function (c) {
		var self = this;
		this.debugDraw();


		var contact = new Box2D.Dynamics.b2ContactListener;
		// contact.BeginContact = c.BeginContact;
		// contact.EndContact = c.BeginContact;
		// contact.PreSolve = c.BeginContact;
		contact.PostSolve = c.BeginContact;

		this.world.SetContactListener(contact);

	},
	rect : function (opts) {
		var fixDef = new b2FixtureDef();
		fixDef.restitution = 0;
		fixDef.density = opts.density ? opts.density : 1;
		fixDef.friction = opts.friction ? opts.friction : 0.5;

		var bodyDef = new b2BodyDef();
		bodyDef.type = opts.type ? b2Body['b2_' + opts.type.toLowerCase() + 'Body'] : b2Body.b2_staticBody;
		bodyDef.position.x = ((opts.x + opts.w) - (opts.w / 2)) / this.SCALE;
		bodyDef.position.y = (opts.y + (opts.h / 2)) / this.SCALE;
		bodyDef.userData = opts;

		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox((opts.w / 2) / this.SCALE, (opts.h / 2) / this.SCALE);
		

		var body = this.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return new Body(body, opts);
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