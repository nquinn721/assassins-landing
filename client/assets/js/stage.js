
function Stage () {
   this.stage = new createjs.Stage(document.getElementById('game'));
   this.items = [];
}

Stage.prototype = {
   init : function () {
      box2d.init({
         BeginContact : this.beginContact.bind(this)
      });
      // this.initItems();
      this.ticker();
   },
   beginContact : function (contact) {
      var one = contact.GetFixtureA().GetBody().GetUserData(),
          two = contact.GetFixtureB().GetBody().GetUserData();
      one = this.getById(one.id);
      two = this.getById(two.id);

      if(one && one.contact)
         one.contact(two);
      if(two && two.contact)
         two.contact(one);
   },
   // initItems : function () {
   //    for(var i = 0; i < this.items.length; i++)
   //       if(this.items[i].init)this.items[i].init(); 
   // },
   create : function (obj) {
      this.items.push(obj);
   },
   ticker : function () {
      createjs.Ticker.addEventListener('tick', this.tick.bind(this));
      createjs.Ticker.setFPS(60);
      createjs.Ticker.useRAF = true;
   },
   getById : function (id) {
      return _.findWhere(this.items, {id : id});
   },
   tick : function () {
      box2d.tick();
      for(var i = 0; i < this.items.length; i++)
         if(this.items[i].tick)this.items[i].tick();
      // this.stage.update();
   }
}
