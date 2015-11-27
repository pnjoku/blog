var PostSchema = require('../../models/post').model('Post');

function Post() {};

// All posts
Post.prototype.all = function(callback) {
    PostSchema.find({}, function(error, posts) {
        if (error) {
            return callback(error, null);
        }
        return callback(posts, null);
    });
};

// Create
Post.prototype.create = function(data, callback) {
    var post = new PostSchema(data);

    post.save(function(error, newPost) {
        if (error) {
            return callback(error, null);
        }

        callback(null, newPost);
    });
};

module.exports = Post;
