//DB Connection:
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var filesSchema = new schema({
    id:  {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    searchFlag: {type: Boolean, required: true},
    txt: {type: String},
    more: {type: String}
}, {collection: 'filesInfo'});
//Exports + indicators
var file = mongoose.model('filesInfo', filesSchema);
console.log('Connected to filesInfo DB...!');
module.exports = file;
