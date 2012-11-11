/**
 * Custom Backbone stuff to make lives easier.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */

 _.templateSettings = {
   interpolate : /\{\{(.+?)\}\}/g
 };

/**
 * Extends the view so we can have onClose and onOpen events.
 */
GL.Framework.View = Backbone.View.extend({
  bindings: [],

  bindTo: function (model, ev, callback) {
    model.bind(ev, callback, this);
    this.bindings.push({ model: model, ev: ev, callback: callback });
  },

  unbindAll: function () {
    _.each(this.bindings, function (binding) {
      binding.model.unbind(binding.ev, binding.callback);
    });
    this.bindings = [];
  },

  /**
   *  Adds a custom close method so that we could catch close events for each view.
   */
  close: function() {
    this.unbindAll();
    this.remove();
    if (this.onClose) {
      this.onClose();
    }
    this.unbind();
  }
});

/**
 * Extends the router so we can have custom app routes.
 */
GL.Framework.Router = Backbone.Router.extend({
  initialize: function() {
    this._bindAppRoutes(this.appRoutes);
  },

  /**
   * Bind more routes from the appRoute since we overrided the main Router.
   */
  _bindAppRoutes: function(appRoutes) {
    if (!appRoutes) return;
    var routes = [];
    for (var route in appRoutes) {
      routes.unshift([route, appRoutes[route]]);
    }
    for (var i = 0, l = routes.length; i < l; i++) {
      this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
    }
  },
});

/**
 * Uses the best pracitices from the Microsoft PRISM patterns:
 * http://msdn.microsoft.com/en-us/library/gg406140.aspx
 */
GL.Framework.RegionManager = (function () {
  var currentView;
  var el = '#main';
  var region = {};

  var closeView = function (view) {
    if (view && view.close) {
      view.close();
    }
  };

  var openView = function (view) {
    view.render();
    $(el).html(view.el);
    if (view.onShow) {
      view.onShow();
    }
  };

  var show = function (view) {
    closeView(currentView);
    currentView = view;
    openView(currentView);
  };

  return {
    show: show
  };

})();

/**
 * TODO: This should be integrated into the View Framework so we could
 *       use HTML5 PushState natively.
 */
GL.Framework.navigate = function(page) {
  Backbone.history.navigate(page, {trigger: true});
};

GL.Framework.visitLink = function(e) {
  var hitDOM = $(e.target);
  var href = hitDOM.attr('href') || hitDOM.parent().attr('href');
  if (href) {
    e.preventDefault();
    GL.Framework.navigate(href);
  }
};

/**
 * Returns the template contents.
 */
GL.Framework.template = function(templateName, isRaw) {
  var rawTemplate = $('#template' + templateName).html();
  if (isRaw) return rawTemplate;
  return _.template(rawTemplate);
};
