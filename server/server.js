var express = require('express'),
    mongoose = require('mongoose'),
    connect = require('express/node_modules/connect'),
    parseCookie = connect.utils.parseCookie,
    MongoStore = require('connect-mongo')(express),
    LessMiddleware = require('less-middleware'),
    routing = require('./routes'),
    app = express(),
    store = new MongoStore({ db: 'gl-' + app.settings.env }),
    port = process.env.PORT || 8000,
    _ = require('underscore')._,
    OAuth = require('oauth').OAuth,
    querystring = require('querystring');

// Setup the session token.
var expressSession = express.session({
  secret: process.env.SESSION_SECRET || 'secret123',
  key: 'express.sid',
  store: store
});

// Configure the main server app.
app.configure(function() {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false, pretty: true });
  app.set('basepath', '/');
  app.set('db-uri', process.env.MONGOHQ_CONNECTION || 'mongodb://localhost/gl-' + app.settings.env);
  app.set('github-client-id', process.env.GITHUB_CLIENT_ID || '');
  app.set('github-client-secret', process.env.GITHUB_CLIENT_SECRET || '');
  app.set('facebook-app-id', process.env.FACEBOOK_APP_ID || '');
  app.set('facebook-app-secret', process.env.FACEBOOK_APP_SECRET || '');
  app.set('public-dir', __dirname + '/../public/');
  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(expressSession);
  app.use(LessMiddleware({ src: app.set('public-dir'), compress: true }));
  app.use(express.static(app.set('public-dir')));
});

// Connect to mongoose.
mongoose.connect(app.set('db-uri'), function(error) {
  if (error) console.error('MongoDB is not running', error);
});

// Express routing.
routing.attach(app);


// Start listening the http server.
app.listen(port, function() {
  console.log('Server running on ' + app.settings.env + ' port ' + port);
});

