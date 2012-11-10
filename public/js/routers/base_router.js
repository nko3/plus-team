GL.Routers.Base = GL.Framework.Router.extend({
  routes: {
    '*actions': 'notfound'
  },

  initialize: function() {
    GL.Framework.Router.prototype.initialize.call(this);
    this._indexView = new GL.Views.Init();
  },

  notfound: function() {
    GL.Framework.RegionManager.show(new GL.Views.NotFound());
  }
});
