GL.Views.Instagram = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Instagram');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});

