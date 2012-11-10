var Resource = require('express-resource');

/**
 * Uses express resource RESTful URLs
 */
exports.attach = function attachRoutes(app) {
  // Main landing page.
  app.resource(require('./controllers/index_controller'));

  app.all('*', function(req, res) {
    res.render('layout');
  });
}

