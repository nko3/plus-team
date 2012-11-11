
GL.Views.Github = GL.Framework.View.extend({
  el: '#githubMod',

  initialize: function(obj) {
    this._userModel = obj.userModel;
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

    var recentStats = {
      pushCount: 0,
      watchCount: 0,
      followCount: 0
    };

    // Organize all the data.
    _.each(json, function(ev) {
      switch(ev.type) {
        case 'PushEvent':
          recentStats.pushCount++;
          break;
        case 'WatchEvent':
          recentStats.watchCount++;
          break;
        case 'FollowEvent':
          recentStats.followCount++;
          break;
      }
    });

    $(this.el).html(this._template({
      data: json,
      initial: this._userModel,
      stats: recentStats
    }));
    GL.Events.trigger(GL.Constants.GITHUB_DATA_RECEIVED_EVENT, json);
    return this;
  }
});

