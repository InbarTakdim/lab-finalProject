//DB schema:
var feed = require('./feed');
// var EXdata = require('./EXdata');
//Controller functions:
// var data2 = EXdata.data;

var http = require("http");
    url = "http://kikar.org/api/v1/facebook_status/?limit=1000&feed__is_current=true&content__contains=%D7%A9%D7%95%D7%90%D7%94&published__gte=2016-01-01";

// get is a simple wrapper for request()
var data ;
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    
var buffer = "", 
        data2,
        route;
    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        // console.log(buffer);
        // console.log("\n");
        data2 = JSON.parse(buffer);
        data = data2;
        console.log('done!');

        //new data has found:
        // console.log(data);
        // console.log('bye');
    }); 
});


//new update
// console.log(data2);
exports.default = function(req, res, next){

    res.send(data);
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
        res.send(data);
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