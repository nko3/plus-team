GL.Views.Profile = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Profile');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});

