var config = require('./lib/configuration');
var express = require('express');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var db = require('./db');
var path = require('path');
var app = express();
var fs = require('fs');
var nunjucks = require('nunjucks');

var heartbeat = require('./routes/heartbeat'),
    heartbeatRouter = express.Router(),
    blog = require('./routes/blog'),
    blogRouter = express.Router();

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

// only serve static files in development mode
if (config.environment !== 'production') {
    app.use(express.static(path.join(__dirname, 'static_assets')));
}

app.use(bodyParser.urlencoded({extended:true}));

app.get('/posts', function(req, res)
{
  mongoose.model('Blog').find(function(err, blogs){
    if(err) console.log(err);
    res.send(blogs);
  })
})

heartbeatRouter.get('/heartbeat', heartbeat.index);
app.use('/', heartbeatRouter);

blogRouter.get('/email', blog.getEmail);
blogRouter.post('/email', blog.sendEmail);
blogRouter.get('/about', blog.about);
blogRouter.get('/', blog.index);
app.use('/', blogRouter);

var server = app.listen(config.get('express:port'), function() {
  console.log('%s starting up on port %s using the %s environment', config.get('application:name'), config.get('express:port'), config.environment);
});

module.exports = app;
