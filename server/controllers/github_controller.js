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
          db.User.find({ githubID: data['id'] }, function(error, response) {
            if (response.length === 0) {
              var user = new db.User({
                name: data['name'],
                email: data['email'],
                username: data['login'],
                githubID: data['id'],
                githubToken: accessToken.split('=')[1]
              });
              user.save(function (err) {
                // if (err) // ...
                // res.end('meow');
                console.log(err, 'save')
              });
            } else {
              user = response[0];
            }
            req.session.user = user;
            if (user['facebookID']) {
              res.redirect('/');
            } else {
              res.redirect('/facebook/new');
            }
          });
        }
      });
    }
  });
  // res.render('layout');
}