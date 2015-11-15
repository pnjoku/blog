var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    description: String,
    createdOn: {type: Date, default: Date.now }

});
