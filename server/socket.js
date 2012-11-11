var socketio = require('socket.io'),
    connect = require('express/node_modules/connect'),
    EventEmitter = require('events').EventEmitter,
    parseCookie = require('../public/js/constants/events'),
    Events = null,
    app = null,
    io = null,
    store = null;

/**
 * Verify authorization for websockets for only signed in scenario.
 */
function onAuthorization (data, accept) {
  if (!data.headers.cookie) {
    return accept('No cookie transmitted.', false);
  }

  data.cookie = parseCookie(data.headers.cookie);
  data.sessionID = data.cookie['express.sid'];

  store.load(data.sessionID, function(err, session) {
    if (err || !session || !session.user) {
      return accept('Error', false);
    }
    data.session = session;
    return accept(null, true);
  });
}

/**
 * Automatic Event Registeration.
 */
function aer(obj, caller, req, callback) {
  if (null === req || 'object' !== typeof(req) || !obj[req.method]) {
    callback({});
    return;
  }

  var args = [];
  args.push(caller);
  if (req.args) {
    if (req.args instanceof Array) {
      args.push.apply(args, req.args);
    }
    else {
      args.push(req.args);
    }
  }
  args.push(callback);
  obj[req.method].apply(obj, args);
}

/**
 * Socket Listener
 */
function socketListener(sockets) {

  var self = this;
  sockets.on('connection', function(socket) {
    if (socket.id === undefined) {
      console.error('No way this should happen.');
      return;
    }
    eventEmitter.emit(Events.USER_CONNECTED_EVENT, socket);
  });

  socket.on('disconnect', function(socket) {
    eventEmitter.emit(Events.USER_DISCONNECTED_EVENT, socket)
  });

  /*
   socket.on('messaging', function(req, callback) {
    var endpoint = apis[req.endpoint];
    if (endpoint) {
      aer(endpoint, socket, req, callback);
    }
  });
  */
}

exports.attach = function(_server, _app) {
  app = _app;
  store = app.get('store');
  Events = app.get('events')
  io = socketio.listen(_server);
  io.set('authorization', onAuthorization);

}
