GL.Collections.Photos = Backbone.Collection.extend({
  model: GL.Models.Photo,
  initialize: function(models, options) {
    this._id = options && options.id ? options.id : null;
  },
  url: function() {
    return '/api/photos/' + this._id;
  }
});
