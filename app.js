var config = require('./lib/configuration');
var express = require('express');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var db = require('./db');
var path = require('path');
var app = express();
var nunjucks = require('nunjucks');

var heartbeat = require('./routes/heartbeat'),
    heartbeatRouter = express.Router(),
    blog = require('./routes/blog'),
    blogRouter = express.Router();


// Templating
nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

// only serve static files in development mode
if (config.environment !== 'production') {
    app.use(express.static(path.join(__dirname, 'static_assets')));
}

// Middleware
app.use(bodyParser.urlencoded({extended:true}));

// Routes
heartbeatRouter.get('/heartbeat', heartbeat.index);
app.use('/', heartbeatRouter);

blogRouter.get('/email', blog.getEmail);
blogRouter.post('/email', blog.sendEmail);
blogRouter.get('/about', blog.about);
blogRouter.get('/posts', blog.posts);
blogRouter.get('/', blog.index);
app.use('/', blogRouter);

// Server
var server = app.listen(config.get('express:port'), function() {
  console.log('%s starting up on port %s using the %s environment', config.get('application:name'), config.get('express:port'), config.environment);
});

module.exports = app;
