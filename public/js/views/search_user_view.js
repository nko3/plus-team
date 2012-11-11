GL.Views.SearchUsers = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('SearchUsers');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});

