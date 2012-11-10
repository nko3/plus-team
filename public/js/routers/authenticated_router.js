GL.Routers.Application = GL.Routers.Base.extend({
  appRoutes: {
    '': 'home',
    'profile': 'profile'
  },

  initialize: function() {
    GL.Routers.Base.prototype.initialize.call(this);
  },

  home: function() {
    GL.Framework.navigate('profile');
  },

  profile: function() {
    GL.Framework.RegionManager.show(new GL.Views.Profile());
  }

})
