const 
    mongoose = require('mongoose'),
    schema   = mongoose.Schema,
    objectId = mongoose.Types.ObjectId;

let ArticleSchema = new schema({
    title: String,
    description: String,
    image: String,
    tags: [String],
    author: {
        type: objectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', ArticleSchema);