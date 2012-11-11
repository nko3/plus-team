// Main GitHub Controller.
var rest = require('restler')

var app = null;
var db = null;

exports.attach = function(_app) {
  app = _app;
  db = app.get('db');
}

exports.index = function(req, res) {
  console.log('INSTAGRAM:INDEX');
  res.render('layout');
}

exports.new = function(req, res) {
  console.log('INSTAGRAM:NEW');
  var url = [
    'https://api.instagram.com/oauth/authorize/',
    '?client_id=' + app.get('instagram-client-id'),
    '&redirect_uri=' + app.get('redirect-uri') + 'instagram/edit',
    '&response_type=code'
  ]
  res.redirect(url.join(''));
}

exports.edit = function(req, res) {
  console.log('INSTAGRAM:EDIT');
  var url = 'https://api.instagram.com/oauth/access_token';
  var data =  {
    'client_id': app.get('instagram-client-id'),
    'redirect_uri': app.get('redirect-uri') + 'instagram/edit',
    'code': req.query['code'],
    'client_secret': app.get('instagram-client-secret'),
    'grant_type': 'authorization_code'
  };
  rest.post(url, { data: data }).on('complete', function(data, response) {
    if (response.statusCode == 200) {
      db.User.findOne({ _id: req.session.user._id }, function(err, user) {
        user.instagram = data.user;
        user.instagramAccessToken = data.access_token;
        user.save(function() {
          req.session.user = user;
          res.redirect('/');
        });
      });
    } else {
      // TODO: handle error
    }
  });
}