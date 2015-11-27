var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Post', PostSchema);

module.exports = mongoose;
