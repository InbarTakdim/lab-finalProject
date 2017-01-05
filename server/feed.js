// //DB Connection:
// var mongoose = require('mongoose');
// var schema = mongoose.Schema;
// var feedsSchema = new schema({
//      word:  {type: String, index: 1, unique: true, required: true},
//      result: {fileId: {type: Number }, found: {type: Number}},
//  }, {collection: 'feeds'});
// //Exports + indicators:
// var feed = mongoose.model('feeds', feedsSchema);
// console.log('Connected to holoDB...!');
// module.exports = feed;

var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    feedsSchema,
    meta,
    objects,
    attachment;

meta = new schema({
    limit: Number,
    total_count: Number
});

attachment = new schema({
    is_photo: Boolean,
    link: String,
    name: String,
    picture: String,
    source: String,

});

objects = new schema({
    attachment: [attachment],
    content: String,
    content_snippet: String,
    facebook_link: String,
    has_attachment: Boolean,
    like_count: Number,
    member: String,
    party: String,
    publication_restricted: Boolean,
    published: String
});

feedsSchema = new schema({
    meta: meta,
    objects: [objects],
}, {collection: 'feeds'});

feed = mongoose.model('feeds', feedsSchema);
console.log('Connected to holoDB...!');
module.exports = feed;
