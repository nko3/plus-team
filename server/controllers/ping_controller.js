// Main Index Controller.

var app = null;

exports.attach = function(_app) {
  app = _app;
}

exports.index = function(req, res) {
  res.render('layout');
}
