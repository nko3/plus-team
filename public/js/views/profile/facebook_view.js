GL.Views.Facebook = GL.Framework.View.extend({
  el: '#facebookMod',

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
    var json = this._likes.toJSON();
    $(this.el).html(this._template({ data: json }));
    GL.Events.trigger(GL.Constants.FACEBOOK_DATA_RECEIVED_EVENT, json);
    
    $('#fbLikes li img', this.el).tooltip();
    return this;
  }
});

