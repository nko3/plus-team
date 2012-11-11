GL.Collections.Commits = Backbone.Collection.extend({
  model: GL.Models.Commit,
  initialize: function(models, options) {
    this._id = options && options.id ? options.id : null;
  },
  url: function() {
    return '/api/commits/' + this._id;
  }
});
