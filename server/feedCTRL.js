//DB schema:
var feed = require('./feed');
var EXdata = require('./EXdata');
//Controller functions:
var data2 = EXdata.data;
// console.log(data2.text);
exports.default = function(req, res, next){

    res.send(data2);
};

// exports.setFilesFlags = function(req, res){
//     feeds.find({id: 1}
//    ,function(err, obj){
//             if (err) throw err;
//             res.send(obj);
//          });
// };
exports.getUsersInfo = function(req, res){
    if(data2!=null)
        res.send('empty');
    else
        res.send(data2);
};
// exports.feedInFiles = function(req, res){
//     feeds.find({}).where('name').equals('laptop.txt').exec(function (err, obj){
//         if(err) throw err;
//         if (obj==0){
//             res.set('Content-Type', 'text/html');
//             res.send('<html><body><h1>showing result for car id: <b>' + req.params.carid + 
//                      '</b></br>CarID not found , Please try a different one!</h1></body></html>');
//         }
//         else
//             res.send(obj);
//         //mongoose.disconnect();
//     });
// };
// exports.getAllFiles = function(req, res){
//     feeds.find({}).where('Category').equals(req.params.category).exec(function(err,obj){
//         if(err) throw err;
//         if (obj==0){
//             res.set('Content-Type', 'text/html');
//             res.send('<html><body><h1>showing result for car Category: <b>' + req.params.category + 
//                      '</b></br>NO cars in this category, Please try a different one!</h1></body></html>');
//         }
//         else
//             res.send(obj);
//         //mongoose.disconnect();
//     });
// };