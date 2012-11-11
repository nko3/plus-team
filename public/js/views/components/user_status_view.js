GL.Views.UserStatus = GL.Framework.View.extend({
  el: '#profileUserStatus',

  initialize: function(options) {
    console.log('profileUserStatus', options);
    this._template = GL.Framework.template('UserStatus');
    this.render();
    // GL.Events.on('GL:')
  },
  
  render: function() {
    var status = {
      creative: 25,
      social: 25,
      geek: 25
    }
    
    if (this.model.github) {
      var github = this.model.github
      status.creative = status.creative + github.public_repos * .3;

      status.geek = ((2 * github.public_repos) + github.public_gists) * .6;      
      
      status.social = status.social + github.blog.length * .1;
      status.social = status.social + github.bio.length * .03;
      if (github.location) {
        status.social = status.social + 3;
      }
      status.social = status.social + (github.following * .03) + (github.followers * .06);
      
    }
    
    if (this.model.instagram) {
      var instagram = this.model.instagram
      status.social = status.social + instagram.bio.length * .2;
      status.social = status.social + instagram.website.length * .1;
    }
    
    if (this.model.facebook) {
      var facebook = this.model.facebook
      
      if (facebook.sports) {
        status.social = status.social + facebook.sports.length * .3;
      }
    }
    
    console.log('status', status);
    this.$el.html(this._template(status));
  }
});