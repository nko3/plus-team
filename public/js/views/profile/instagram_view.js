
GL.Views.Instagram = GL.Framework.View.extend({

  el: '#instagramMod',
  g:q

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
    var json = this._photos.toJSON();
    $(this.el).html(this._template({data: json}));
    GL.Events.trigger(GL.Constants.INSTAGRAM_DATA_RECEIVED_EVENT, {data: json});
    return this;
  }
});

