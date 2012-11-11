var express = require('express'),
    mongoose = require('mongoose'),
    connect = require('express/node_modules/connect'),
    parseCookie = connect.utils.parseCookie,
    MongoStore = require('connect-mongo')(express),
    LessMiddleware = require('less-middleware'),
    http = require('http'),
    routing = require('./routes'),
    models = require('./models'),
    sockets = require('./socket'),
    app = express(),
    port = process.env.PORT || 8000,
    _ = require('underscore')._,
    OAuth = require('oauth').OAuth,
    querystring = require('querystring'),
    events = require('../public/js/constants/events');


// Configure the main server app.
app.configure(function() {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false, pretty: true });
  app.set('basepath', '/');
  app.set('db', models.db);
  app.set('db-uri', process.env.MONGOHQ_CONNECTION || ('mongodb://localhost/gl-' + app.settings.env));
  app.set('events', events);
  app.set('github-client-id', process.env.GITHUB_CLIENT_ID || '');
  app.set('github-client-secret', process.env.GITHUB_CLIENT_SECRET || '');
  app.set('instagram-client-id', process.env.INSTAGRAM_CLIENT_ID || '');
  app.set('instagram-client-secret', process.env.INSTAGRAM_CLIENT_SECRET || '');
  app.set('redirect-uri', process.env.REDIRECT_URI || '');
  app.set('facebook-app-id', process.env.FACEBOOK_APP_ID || '');
  app.set('facebook-app-secret', process.env.FACEBOOK_APP_SECRET || '');
  app.set('public-dir', __dirname + '/../public/');


  var store = new MongoStore({url: app.get('db-uri')});
  // Setup the session token.
  var expressSession = express.session({
    secret: process.env.SESSION_SECRET || 'secret123',
    key: 'express.sid',
    store: store
  });

  // SocketIO Store usage
  app.set('store', store);

  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(expressSession);
  app.use(LessMiddleware({ src: app.get('public-dir'), compress: true }));
  app.use(express.static(app.get('public-dir')));
  app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.instagramConnected = req.session.user && req.session.user.instagram;
    res.locals.githubConnected = req.session.user && req.session.user.github;
    next();
  });
});

// Connect to mongoose.
console.log('connecting to db', app.get('db-uri'));
mongoose.connect(app.get('db-uri'), function(error) {
  if (error) console.error('MongoDB is not running', error);
});

// For Socket.IO compatibility
var server = http.createServer(app);

// Express routing.
routing.attach(app);

// Enable websockets.
sockets.attach(server, app);

// Start listening the http server.
server.listen(port, function() {
  console.log('Server running on ' + app.settings.env + ' port ' + port);
});

