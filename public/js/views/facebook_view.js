GL.Views.Facebook = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Facebook');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});

