// Entry point for GL
var GL = {
  Framework: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  Events: {},
  Constants: {
    FACEBOOK_DATA_RECEIVED_EVENT: 'FACEBOOK_DATA_RECEIVED',
    INSTAGRAM_DATA_RECEIVED_EVENT: 'INSTAGRAM_DATA_RECEIVED',
    GITHUB_DATA_RECEIVED_EVENT: 'GITHUB_DATA_RECEIVED'
  },
  init: function() {
    new GL.Routers.Application();
  }
};

$(function() {
  GL.init();
});
