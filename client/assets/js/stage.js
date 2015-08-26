
function Stage () {
   this.stage = new createjs.Stage(document.getElementById('game'));
   this.assassins = 0;
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


      if(one && one.contact && !one.hasContact){
         one.hasContact = true;
         one.contact(two);
      }
      if(two && two.contact && !two.hasContact){
         two.hasContact = true;
         two.contact(one);
      }

   },
   // initItems : function () {
   //    for(var i = 0; i < this.items.length; i++)
   //       if(this.items[i].init)this.items[i].init(); 
   // },
   destroy : function (item) {
      this.items.splice(this.items.indexOf(item), 1);
   },
   create : function (obj) {
      this.items.push(obj);
      this.assassins++;
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
