GL.Views.NotFound = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('NotFound');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});

