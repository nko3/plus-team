GL.Routers.Application = GL.Routers.Base.extend({
  appRoutes: {
    '': 'home',
    'profile': 'profile',
    'searchUsers': 'searchUsers'
  },

  initialize: function() {
    GL.Routers.Base.prototype.initialize.call(this);
  },

  home: function() {
    GL.Framework.navigate('profile');
  },

  profile: function() {
    GL.Framework.RegionManager.show(new GL.Views.Profile());
  },
  searchUsers: function() {
    GL.Framework.RegionManager.show(new GL.Views.SearchUsers());
  }

})
