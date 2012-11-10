var Resource = require('express-resource');

/**
 * Uses express resource RESTful URLs
 */
exports.attach = function attachRoutes(app) {
  // Main landing page.
  var indexMapping = require('./controllers/index_controller');
  indexMapping.attach(app);
  app.resource(indexMapping);

  // Enable Auth endpoints.
  addController(app, 'facebook', null, ['edit']);
  addController(app, 'github', null, ['edit']);
  addController(app, 'logout');

  app.all('*', function(req, res) {
    res.render('layout');
  });
}

function addController(app, name, opts, extraMappings) {
  var mappings = require('./controllers/' + name + '_controller');
  var controller = app.resource(name, mappings, opts);
  mappings.attach(app);
  if (extraMappings) {
    extraMappings.forEach(function(mapping) {
      var name = value = mapping;
      if (typeof mapping == 'object') {
        for (name in mapping) {
          value = mapping[name];
        }
      }
      controller.map('post', '/' + name, mappings[value]);
      controller.map('get', '/' + name, mappings[value]);
    });
  }
  return controller;
}
