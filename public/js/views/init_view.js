GL.Views.Init = Backbone.View.extend({
  initialize: function() {

    // Hookup HTML5 Push
    Backbone.history.start({pushState: true});
    $(document).on('click', 'a[data-href]', GL.Framework.visitLink);

    this.footerView = new GL.Views.Footer();
    this.footerView.render();
  }
});
