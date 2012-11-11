// Main GitHub Controller.
var rest = require('restler')

var app = null;
var db = null;

exports.attach = function(_app) {
  app = _app;
  db = app.get('db');
}

exports.photos = function(req, res) {
  console.log('API:PHOTOS');
  var user = req.session.user;
  var url = 'https://api.instagram.com/v1/users/' + user.instagram.id + '/media/recent/';
  url += '?access_token=' + user.instagramAccessToken;
  rest.get(url).on('complete',  function(data, response) {
    return res.send(data.data);
  });
}

exports.commits = function(req, res) {
  console.log('API:COMMITS');
  var user = req.session.user;
  var url = 'https://api.github.com/users/' + user.github.login + '/events/public';
  url += '?access_token=' + user.githubAccessToken;
  rest.get(url).on('complete',  function(data, response) {
    return res.send(data);
  });
}