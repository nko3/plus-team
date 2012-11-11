GL.Views.Facebook = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Facebook');
    this._likes = new GL.Collections.Likes(null, this.model);
    this._likes.on('reset', this.renderData, this);
    this._likes.fetch();
  },

  render:function() {
    $(this.el).html('Loading ..');
    return this;
  },

  renderData: function() {
    $(this.el).html(this._template());
    return this;
  }
});

