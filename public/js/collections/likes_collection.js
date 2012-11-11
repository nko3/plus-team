GL.Collections.Likes = Backbone.Collection.extend({
  model: GL.Models.Like,
  initialize: function(models, options) {
    this._id = options && options.id ? options.id : null;
  },
  url: function() {
    return '/api/likes/' + this._id;
  }
});
