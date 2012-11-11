GL.Views.UserCard = GL.Framework.View.extend({
  el: '#profileUserCard',

  initialize: function(options) {
    console.log('profileUserCard', options);
    this._template = GL.Framework.template('UserCard');
    this.render();
  },
  
  render: function() {
    this.$el.html(this._template(this.model));
  }
});