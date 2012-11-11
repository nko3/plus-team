
GL.Views.Instagram = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Instagram');
    this._photos = new GL.Collections.Photos(null, this.model);
    this._photos.on('reset', this.renderData, this);
    this._photos.fetch();
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

