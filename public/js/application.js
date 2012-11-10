// Entry point for GL
var GL = {
  Framework: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  Events: {},
  Constants: {},
  init: function() {
    new GL.Routers.Application();
  }
};

$(function() {
  GL.init();
});
