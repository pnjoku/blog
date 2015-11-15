var config = require('./lib/configuration');
var express = require('express');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var path = require('path');
var app = express();
var nunjucks = require('nunjucks');

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

var mongoose = require('mongoose');

// only serve static files in development mode
if (config.environment !== 'production'){
    app.use(express.static(path.join(__dirname, 'static_assets')));
}

app.use(bodyParser.urlencoded({extended:true}));


app.get('/heartbeat', function(req, res){
    res.status(200).json({
        status: "alive"
    });
});

app.get('/', function(req, res) {
  res.render('layouts/index.html');
});

app.get('/email', function(req, res) {
  res.render('layouts/email.html');
});

 app.post('/email', function(req, res) {
    res.render('layouts/diddybop.html', {email : req.body.email});
  });

 app.get('/about', function(req, res) {
  res.render('layouts/about.html');
});







var server = app.listen(config.get('express:port'), function() {
  console.log('%s starting up on port %s using the %s environment', config.get('application:name'), config.get('express:port'), config.environment);
});

module.exports = app;
