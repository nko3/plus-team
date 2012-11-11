GL.Views.Footer = GL.Framework.View.extend({
  el: 'footer',

  events: {
    'click #footerNav li': 'onNavigationClicked'
  },

  onNavigationClicked: function(e) {
    $('#footerNav li').removeClass('active');

    var $link = $(e.target).closest('li');
    $link.addClass('active');
  }
})
