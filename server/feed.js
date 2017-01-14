//schema for feed
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    objects,
    attachment;


attachment = new schema({
    is_photo: Boolean,
    link: String,
    name: String,
    picture: String,
    source: String,

});

objects = new schema({
    attachment: attachment,
    content: String,
    content_snippet: String,
    facebook_link: String,
    has_attachment: Boolean,
    id: Number,
    like_count: Number,
    member: String,
    party: String,
    published: String,
<<<<<<< HEAD
    max_str: String,
    key_word: String
=======
    max_str: String
>>>>>>> origin/master
}

, {collection: 'feeds'});

feed = mongoose.model('feeds', objects);
console.log('Connected to holoDB...!');
module.exports = feed;
