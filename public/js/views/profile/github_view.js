
GL.Views.Github = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Github');
    this._commits = new GL.Collections.Commits(null, this.model);
    this._commits.on('reset', this.renderData, this);
    this._commits.fetch();
  },

  render: function() {
    $(this.el).html('Loading ..');
    return this;
  },

  renderData: function() {
    $(this.el).html(this._template());
    return this;
  }
});

