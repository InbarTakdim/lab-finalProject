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
