//DB schema:
var feed = require('./feed');
// var EXdata = require('./EXdata');

var http = require('http');

var urlSet = [
//         // 'https://api.twitter.com/1.1/search/tweets.json?q=%D7%A9%D7%95%D7%90%D7%94%20OR%20%D7%90%D7%A0%D7%98%D7%99%D7%A9%D7%9E%D7%99%D7%95%D7%AA&since_id=33473850',
            //'shoa'  :
            'http://kikar.org/api/v1/facebook_status/?limit=1000&feed__is_current=true&content__contains=%D7%A9%D7%95%D7%90%D7%94&published__gte=2016-11-01',
            //'antis' : 
            'http://kikar.org/api/v1/facebook_status/?limit=100&feed__is_current=true&content__contains=%D7%90%D7%A0%D7%98%D7%99%D7%A9%D7%9E%D7%99&published__gte=2016-11-01',
            //'nazi'  : 
            'http://kikar.org/api/v1/facebook_status/?limit=100&feed__is_current=true&content__contains=%D7%A0%D7%90%D7%A6%D7%99&published__gte=2016-11-01',
            //'hitler'  : 
            'http://kikar.org/api/v1/facebook_status/?limit=100&feed__is_current=true&content__contains=%D7%94%D7%99%D7%98%D7%9C%D7%A8&published__gte=2016-11-01'
            ];

var body = '', data1;

http = http.get(urlSet[0], function(res){
    
    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        data1= JSON.parse(body);
        console.log('done!');
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});

exports.default = function(req, res, next){

    var data2 =[], temp={}; 
    data1.objects.forEach(function(obj){
        if (obj.has_attachment ==null){
            temp={
                    "content": obj.content,
                    "content_snippet": obj.content_snippet,
                    "facebook_link": obj.facebook_link,
                    "has_attachment": false,
                    "id": obj.id,
                    "like_count": obj.like_count,
                    "member": obj.member,
                    "party": obj.party,
                    "published": obj.published
                    };
                    data2.push(temp);
        }
        else{
            temp={
                    "attachment":{
                        "is_photo": obj.attachment.is_photo,
                        "link: obj": obj.attachment.link,
                        "name": obj.attachment.name,
                        "picture": obj.attachment.picture,
                        "source": obj.attachment.source,
                    },
                    "content": obj.content,
                    "content_snippet": obj.content_snippet,
                    "facebook_link": obj.facebook_link,
                    "has_attachment": obj.has_attachment,
                    "id": obj.id,
                    "like_count": obj.like_count,
                    "member": obj.member,
                    "party": obj.party,
                    "published": obj.published
            };
            data2.push(temp);
        };
        // console.log(temp);
        feed.collection.update({"id": obj.id}, temp, {upsert: true}, function(err, records){
                console.log("Record added as: "+obj.id);
        });
    });

    res.send(data2);
};

// exports.updateDB = function(req, res, next){
//     res.send(data1);
// };

exports.getFeedsByName = function(req, res){
    var query = feed.find({member:req.params.member});
    query.exec(function(err, data) {
        if (err) return res.send(err);
            res.status(200).json(data);
        console.log(data);
    });

};

exports.getAllFeeds = function(req, res){
    console.log('hi');
    var query = feed.find({});
    query.exec(function(err, data) {
        if (err) return res.send(err);
            res.status(200).json(data);
        console.log(data);
    });

};

exports.getFeedsFromTo = function(req, res){
    console.log(req.params.from);
    var query = feed.find({published: {$gte: req.params.from , $lte: req.params.to }});
    query.exec(function(err, data) {
        if (err) return res.send(err);
            res.status(200).json(data);
        console.log(data);
    });

};

exports.getAllMembers = function(req, res){
    var query = feed.distinct('member');
    query.exec(function(err, data) {
        if (err) return res.send(err);
            res.status(200).json(data);
        console.log(data);
    });

};

