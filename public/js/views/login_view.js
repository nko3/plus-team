GL.Views.Login = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Home');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});

