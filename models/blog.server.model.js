var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(callback)
{
  var blogSchema = new Schema(
  {
    title: String,
    description: String,
    createdOn: {type: Date, default: Date.now }

  });

  var Blog = mongoose.model('Blog', blogSchema);

  var secondPost = new Blog(
  {
    title: 'Second Post',
    description: "This is my second blog post, Hope to have many more!"
  });

  secondPost.save(function(err, firstPost)
  {
    if(err) return console.error(err);
    console.dir(secondPost);
  })
});




