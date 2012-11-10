// Main GitHub Controller.
var rest = require('restler')

var app = null;
var db = null;

exports.attach = function(_app) {
  app = _app;
  db = app.get('db');
}

exports.index = function(req, res) {
  console.log('FACEBOOK:INDEX');
  res.render('layout');
}

exports.new = function(req, res) {
  console.log('FACEBOOK:NEW');
  var url = [
    'https://www.facebook.com/dialog/oauth',
    '?client_id=' + app.get('facebook-app-id'),
    '&redirect_uri=' + app.get('redirect-uri') + 'facebook/edit'
  ]
  res.redirect(url.join(''));
}

exports.edit = function(req, res) {
  console.log('FACEBOOK:EDIT');
  var url = 'https://graph.facebook.com/oauth/access_token';
  var data =  {
    'client_id': app.get('facebook-app-id'),
    'redirect_uri': app.get('redirect-uri') + 'facebook/edit',
    'code': req.query['code'],
    'client_secret': app.get('facebook-app-secret')
  };
  rest.post(url, { data: data }).on('complete', function(data, response) {
    if (response.statusCode == 200) {
      var accessToken = data.split('&')[0]
      var url = 'https://graph.facebook.com/me?' + accessToken;
      rest.get(url).on('complete', function(data, response) {
        if (response.statusCode == 200) {
          data = JSON.parse(data);
          var user = db.User.findOne({'_id': req.session.user['_id']}, function(err, user) {
            user.facebookID = data['id'];
            user.facebookToken = accessToken.split('=')[1];
            user.save();
          });
            res.redirect('/profile');
          // });
        }
      });
    }
  });
  // res.render('layout');
}