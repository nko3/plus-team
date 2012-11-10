GL.Views.Init = Backbone.View.extend({
  initialize: function() {

    // Hookup HTML5 Push
    Backbone.history.start({pushState: true});
    $(document).on('click', '.gl-push', GL.Framework.visitLink);
  },
});
