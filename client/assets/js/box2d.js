

function B2D(Box2D, Body) {
	this.Box2D = Box2D;
	this.b2Vec2 = Box2D.Common.Math.b2Vec2;
	this.b2BodyDef = Box2D.Dynamics.b2BodyDef;
	this.b2Body = Box2D.Dynamics.b2Body;
	this.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	this.b2Fixture = Box2D.Dynamics.b2Fixture;
	this.b2World = Box2D.Dynamics.b2World;
	this.b2MassData = Box2D.Collision.Shapes.b2MassData;
	this.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	this.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	this.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


	this.Body = Body;

   	this.SCALE = 30;
    this.world = world = new this.b2World(new this.b2Vec2(0, 70), true);
}

B2D.prototype = {
	init : function (c) {
		var self = this;
		if (typeof module === "undefined")
			this.debugDraw();


		var contact = new this.Box2D.Dynamics.b2ContactListener;
		// contact.BeginContact = c.BeginContact;
		// contact.EndContact = c.BeginContact;
		// contact.PreSolve = c.BeginContact;
		contact.PostSolve = c.BeginContact;

		this.world.SetContactListener(contact);

	},
	rect : function (opts) {
		var fixDef = new this.b2FixtureDef();
		fixDef.restitution = 0;
		fixDef.density = opts.density ? opts.density : 1;
		fixDef.friction = opts.friction ? opts.friction : 0.5;

		var bodyDef = new this.b2BodyDef();
		bodyDef.type = opts.type ? this.b2Body['b2_' + opts.type.toLowerCase() + 'Body'] : this.b2Body.b2_staticBody;
		bodyDef.position.x = ((opts.x + opts.w) - (opts.w / 2)) / this.SCALE;
		bodyDef.position.y = (opts.y + (opts.h / 2)) / this.SCALE;
		bodyDef.fixedRotation = true;
		bodyDef.userData = opts;

		fixDef.shape = new this.b2PolygonShape();
		fixDef.shape.SetAsBox((opts.w / 2) / this.SCALE, (opts.h / 2) / this.SCALE);
		

		var body = this.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return new this.Body(body, this.b2Vec2, opts);
	},
	debugDraw : function () {
		var debugDraw = new this.b2DebugDraw();
		debugDraw.SetSprite(debug.getContext('2d'));
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetDrawScale(this.SCALE);
		debugDraw.SetFlags(this.b2DebugDraw.e_shapeBit | this.b2DebugDraw.e_jointBit);
		this.world.SetDebugDraw(debugDraw);
	},
	tick : function () {
		this.world.DrawDebugData();
		this.world.Step(1/60, 10, 10);
		this.world.ClearForces();
	}
}



if (typeof module !== "undefined" && module.exports)
	module.exports = B2D;