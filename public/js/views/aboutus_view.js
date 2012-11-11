GL.Views.AboutUs = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('AboutUs');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});