GL.Views.Github = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Github');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});

