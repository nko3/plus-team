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

exports.likes = function(req, res) {
  console.log('API:LIKES');
  var user = req.session.user;
  var url = 'https://graph.facebook.com/me/likes';
  url += '?access_token=' + user.facebookAccessToken;
  console.log(url)
  rest.get(url).on('complete',  function(data, response) {
    data = JSON.parse(data)
    return res.send(data.data);
  });
}

exports.users = function(req, res) {
  console.log('API:USER');
  var user = req.session.user;
  var data = {
    name: user.name,
    facebook: user.facebook,
    github: user.github,
    instagram: user.instagram
  };
  return res.send(data);
}