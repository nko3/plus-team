// Main GitHub Controller.
var rest = require('restler')

var app = null;
var db = null;

exports.attach = function(_app) {
  app = _app;
  db = app.get('db');
}

exports.photos = function(req, res) {
  console.log('API:COMMITS');
  var user = req.session.user;
  var id = req.params.id;
  
  if (id && id != 'me') {
    getUserById({ id: id, callback: function(user) {
      if (user) {
        var url = 'https://api.instagram.com/v1/users/' + user.instagram.id + '/media/recent/';
        url += '?access_token=' + user.instagramAccessToken;
        rest.get(url).on('complete',  function(data, response) {
          return res.send(data.data);
        });
      } else {
        res.send({});
      }
    }});
  } else {
    var url = 'https://api.instagram.com/v1/users/' + user.instagram.id + '/media/recent/';
    url += '?access_token=' + user.instagramAccessToken;
    rest.get(url).on('complete',  function(data, response) {
      return res.send(data.data);
    });
  }
}


exports.commits = function(req, res) {
  console.log('API:COMMITS');
  var user = req.session.user;
  var id = req.params.id;
  
  if (id && id != 'me') {
    getUserById({ id: id, callback: function(user) {
      if (user) {
        var url = 'https://api.github.com/users/' + user.github.login + '/events/public';
        url += '?access_token=' + user.githubAccessToken;
        rest.get(url).on('complete',  function(data, response) {
          return res.send(data);
        });
      } else {
        res.send({});
      }
    }});
  } else {
    var url = 'https://api.github.com/users/' + user.github.login + '/events/public';
    url += '?access_token=' + user.githubAccessToken;
    rest.get(url).on('complete',  function(data, response) {
      return res.send(data);
    });
  }
}

exports.likes = function(req, res) {
  console.log('API:LIKES');
  var user = req.session.user;
  var id = req.params.id;
  
  if (id && id != 'me') {
    getUserById({ id: id, callback: function(user) {
      if (user) {
        var url = 'https://graph.facebook.com/me/likes';
        url += '?access_token=' + user.facebookAccessToken;
        getLikes(res, url);
      } else {
        res.send({});
      }
    }});
  } else {
    var url = 'https://graph.facebook.com/me/likes';
    url += '?access_token=' + user.facebookAccessToken;
    getLikes(res, url);
  }
}

function getLikes(res, url) {
  rest.get(url).on('complete',  function(data, response) {
    data = JSON.parse(data)
    return res.send(data.data);
  });
}

exports.users = function(req, res) {
  console.log('API:USERS');
  var data = [];
  db.User.find(function(err, users) {
    users.forEach(function(user) {
      data.push({
        id: user._id,
        name: user.name,
        facebook: user.facebook,
        github: user.github,
        instagram: user.instagram
      });
    });
    return res.send(data);
  })
}

exports.usersId = function(req, res) {
  console.log('API:USERSID');
  var id  = req.params.id;
  if (req.params.id === 'me') {
    id = req.session.user._id;
  }
  getUserById({ id: id, callback: function(user) {
    var data = {};
    if (user) {
      data = {
        id: user._id,
        name: user.name,
        facebook: user.facebook,
        github: user.github,
        instagram: user.instagram
      };
    }
    return res.send(data);
  }});
}

function getUserById(options) {
  db.User.findOne({ '_id': options.id }, function(err, user) {
    options.callback(user);
  })
}