GL.Routers.Base = GL.Framework.Router.extend({
  routes: {
    '*actions': 'notfound'
  },

  initialize: function() {
    GL.Framework.Router.prototype.initialize.call(this);
  },

  notfound: function() {
    GL.Framework.RegionManager.show(new GL.Views.NotFound());
  }
});
