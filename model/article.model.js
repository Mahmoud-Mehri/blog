const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    tags: [String],
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', ArticleSchema);