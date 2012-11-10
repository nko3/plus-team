
var app = null;

exports.attach = function(_app) {
  app = _app;
}

exports.index = function (req, res) {
  if (req.session) {
    req.session.destroy();
  }
  res.redirect('/');
};
