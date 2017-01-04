//DB Connection:
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var feedsSchema = new schema({
     word:  {type: String, index: 1, unique: true, required: true},
     result: {fileId: {type: Number }, found: {type: Number}},
 }, {collection: 'feeds'});
//Exports + indicators:
var feed = mongoose.model('feeds', feedsSchema);
console.log('Connected to holoDB...!');
module.exports = feed;

