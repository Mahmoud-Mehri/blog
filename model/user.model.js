const 
    mongoose = require('mongoose'),
    schema   = mongoose.Schema,
    objectId = mongoose.Types.ObjectId;

let UserSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    email: String,
    facebookid: String,
    profile_pic: String,
    followings: [String],
    followers: [String],
    articles: {
        type: objectId,
        ref: 'Article',
    }
})

module.exports = mongoose.model('User', UserSchema);