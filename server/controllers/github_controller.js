// Main GitHub Controller.
var rest = require('restler')

var app = null;
var db = null;

exports.attach = function(_app) {
  app = _app;
  db = app.get('db');
}

exports.index = function(req, res) {
  console.log('GITHUB:INDEX');
  res.render('layout');
}

exports.new = function(req, res) {
  console.log('GITHUB:NEW');
  var url = [
    'https://github.com/login/oauth/authorize',
    '?client_id=' + app.get('github-client-id'),
    '&redirect_uri=' + app.get('redirect-uri') + 'github/edit'
  ]
  res.redirect(url.join(''));
}

exports.edit = function(req, res) {
  console.log('GITHUB:EDIT');
  var url = 'https://github.com/login/oauth/access_token';
  var data =  {
    'client_id': app.get('github-client-id'),
    'redirect_uri': app.get('redirect-uri') + 'github/edit',
    'code': req.query['code'],
    'client_secret': app.get('github-client-secret')
  };
  rest.post(url, { data: data }).on('complete', function(data, response) {
    if (response.statusCode == 200) {
      var accessToken = data.split('&')[0]
      var url = 'https://api.github.com/user?' + accessToken;
      rest.get(url).on('complete', function(data, response) {
        if (response.statusCode == 200) {
          db.User.findOne({ _id: req.session.user._id }, function(err, user) {
            user.github = data;
            user.githubAccessToken = accessToken.split('=')[1];
            user.save(function() {
              res.redirect('/');
            });
          });
        } else {
          // TODO: handle error
        }
      });
    }
  });
}