// get walking directions from central park to the empire state building
var http = require("http");
    url = "http://kikar.org/api/v1/facebook_status/?limit=1000&feed__is_current=true&content__contains=%D7%A9%D7%95%D7%90%D7%94&published__gte=2016-01-01";

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
        data,
        route;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        // console.log(buffer);
        // console.log("\n");
        data = JSON.parse(buffer);
        // route = data.routes[0];

        //new data has found:
        console.log(data);
    }); 
}); console.log('hello');
    exports.data;
