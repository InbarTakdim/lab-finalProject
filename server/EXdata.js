var http = require('http');
var url = 'http://kikar.org/api/v1/facebook_status/?limit=1000&feed__is_current=true&content__contains=%D7%A9%D7%95%D7%90%D7%94&published__gte=2016-11-01';

http = http.get(url, function(res){
    var body = '',
        data;
    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        // dataTest = JSON.parse(body);
        data = body;
        console.log('done!');
        // console.log("Got a response: ", fbResponse.picture);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
module.exports = E

// var sequence = Futures.sequence();
// sequence
// .then(function(next) {
//     var body ='', data;

//     for(url in urlSet){
//             // console.log(urlSet[url]);
//             http.get(urlSet[url], function(res){
//                 console.log('********************************');
//                 res.on('data', function(chunk){
//                     body += chunk;

//                 });

//                 res.on('end', function(){
//                     // console.log('done!');
//                     console.log(body);
//                     data=JSON.stringify(body);
//                     console.log(data);
                    
//                 }).on('end',function(){
//                     // data = JSON.parse(body);

//                 })
//         })
//             .on('error', function(e){
//               console.log("Got an error: ", e);
//         });
//     }next;
//     // console.log('hiiiiiiiiiiiiiiiiiiiiiii')

// }).then(function(next,data) {
//     next;
//     console.log(data);
// });


//   .then(function(next) {
//             http.get(urlSet.shoa, next);
//             console.log('done! 1');
//   })
//   .then(function(next, res) {
//             res.on("data", function(chunk){
//                 body += chunk;
//                 console.log('done! 2');
//             })
//             res.on("end", next)
//     })
//   .then(function(next, d) {
//             http.get(urlSet.antis, next);
//   })
//   .then(function(next, res) {
//             res.on("data", function(chunk){
//                 body += chunk;
//                 console.log('done! 3');
//             })
//             res.on("end", next)
//     })
//   .then(function(next, res) {
//             console.log('done! 4');
//             // data= JSON.parse(body);
//             console.log(body);
//         });
  

// http = http.get(url, function(res){
        
//         res.on('data', function(chunk){
//             body += chunk;
//         });

//         res.on('end', function(){
//             console.log('done!');
//             if (i== url.length()-1){
//                 data= JSON.parse(body)
//             }
//         });
//     }).on('error', function(e){
//           console.log("Got an error: ", e);
//     });