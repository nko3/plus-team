
GL.Views.Github = GL.Framework.View.extend({

  initialize: function (foo, bar) {
    console.log(foo, bar);
    this._template = GL.Framework.template('Github');
    this._commits = new GL.Collections.Commits(null, this.model);
    this._commits.on('reset', this.renderData, this);
    this._commits.fetch();
  },

  render: function() {
    $(this.el).html('Loading ..');
    return this;
  },

  renderData: function() {
    var json = this._commits.toJSON();
    console.log(json);

    // Organize all the data.
    _.each(json, function(ev) {
      switch(ev.type) {
        case 'PushEvent':
          //pushCount++;
          break;
        case 'WatchEvent':
          //watchCount++;
          break;
        case 'FollowEvent':
          //followCount++;
          break;
      }
    });

    $(this.el).html(this._template({ data: json }));
    GL.Events.trigger(GL.Constants.GITHUB_DATA_RECEIVED_EVENT, json);
    return this;
  }
});

