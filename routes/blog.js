var mongoose = require('mongoose'),
    PostService = require('../services/post'),
    Post = new PostService();

exports.index = function(req, res) {
    return res.render('index.html', {});
};

exports.about = function(req, res) {
    return res.render('about.html', {});
};

exports.getEmail = function(req, res) {
    return res.render('email.html', {});
};

exports.sendEmail = function(req, res) {
    return res.render('diddybop.html', {email : req.body.email});
};

exports.posts = function(req, res) {
    Post.all(function(error, posts) {
        if (error) {
            return res.status(500);
        }

        return res.render('posts.html', { posts: posts });
    });
};
