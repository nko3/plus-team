GL.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  defaults: {
    name: 'Unnamed'
  },

  validate: function(attrs) {
    if (!attrs.name) {
      return 'You must have a name, tell your mom!';
    }
  }
});
