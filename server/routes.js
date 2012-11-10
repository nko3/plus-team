var Resource = require('express-resource');

/**
 * Uses express resource RESTful URLs
 */
exports.attach = function attachRoutes(app) {
  // Main landing page.
  app.resource(require('./controllers/index_controller'));

  app.get('/auth/github', function(req, res) {
    // TODO: full GitHub auth URL
    res.redirect('https://github.com/login/oauth/authorize');
  });
  
  app.get('/auth/facebook', function(req, res) {
    // TODO: full Facebook auth URL
    res.redirect('https://www.facebook.com/dialog/oauth');
  });

  app.all('*', function(req, res) {
    res.render('layout');
  });
}

