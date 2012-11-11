GL.Collections.User = Backbone.Collection.extend({
  url: '/api/users',
  model: GL.Models.User
});
