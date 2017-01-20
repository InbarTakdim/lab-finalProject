//DB schema config:
var feed = require('./feed'); 

var request = require('request');
//var request = require('sync-request');

var urlSet = [
            //'shoa'  :
            'http://kikar.org/api/v1/facebook_status/?limit=1000&feed__is_current=true&content__contains=%D7%A9%D7%95%D7%90%D7%94&published__gte=2016-01-01',
            //'antis' : 
            'http://kikar.org/api/v1/facebook_status/?limit=100&feed__is_current=true&content__contains=%D7%90%D7%A0%D7%98%D7%99%D7%A9%D7%9E%D7%99&published__gte=2016-01-01',
            //'nazi'  : 
            'http://kikar.org/api/v1/facebook_status/?limit=100&feed__is_current=true&content__contains=%D7%A0%D7%90%D7%A6%D7%99&published__gte=2016-01-01',
            //'hitler'  : 
            'http://kikar.org/api/v1/facebook_status/?limit=100&feed__is_current=true&content__contains=%D7%94%D7%99%D7%98%D7%9C%D7%A8&published__gte=2016-01-01'
            ];

var body =' ', data1 = [];

//Always run:   
urlSet.forEach(function(url, i){
   request(url, function (error, response, _body) {
        if (!error && response.statusCode == 200) {
            body+=_body;
            console.log('***done: '+i+'***');
            data1[i]=JSON.parse(_body);
            // console.log(data1);
        }
        else{
            console.log(error);
        }
    });
});

 
exports.default = function(req, res, next){
    var data2 =[], temp={}; 
    var key=' ';
    data1.forEach(function(obj, i){
        obj.objects.forEach(function(field){
            key=String(i);

            if(i==0) key="שואה";
            else if(i==1) key="אנטישמיות";
            else if(i==2) key="נאצי";
            else if(i==3) key="היטלר";


            var max=' ';
            var str=field.content;
            str= str.split(" ");
            for(var f=0; f<str.length ; f++)
            {

                str[f]=str[f].trim();
                str[f] = str[f].split('.').join("");
                str[f] = str[f].split(',').join("");
            }
            var stopList=["-","על","אם", "\n","את","של" ,"כי","תא" ,"הוא" ,"?" ,"היא" ,"לא", "כן","", ","];
            var index=-1;
            var indexes = [];
            var p=-1;

            for (var k=0; k<stopList.length; k++)
            {
                p = -1;
                while ((p = str.indexOf(stopList[k], p+1)) != -1)
                {   
                    //console.log("word: "+ stopList[k] + " searching from index = " + (p+1));
                    //console.log("before splice: "+ str);
                    str.splice(p, 1);
                    //console.log("after splice: "+ str);
                    //console.log("-- "+ p);
                    p=p-1;
                }
            }
            
            max=common_word(str);



            if (field['has_attachment'] ==null){
                temp={
                        "content": field.content,
                        "content_snippet": field.content_snippet,
                        "facebook_link": field.facebook_link,
                        "has_attachment": false,
                        "id": field.id,
                        "like_count": field.like_count,
                        "member": field.member,
                        "party": field.party,
                        "published": field.published,
                        "max_str": max,
                        "key_word" : key
                        };
                        data2.push(temp);
            }
            else{
                temp={
                        "attachment":{
                            "is_photo": field.attachment.is_photo,
                            "link: field": field.attachment.link,
                            "name": field.attachment.name,
                            "picture": field.attachment.picture,
                            "source": field.attachment.source,
                        },
                        "content": field.content,
                        "content_snippet": field.content_snippet,
                        "facebook_link": field.facebook_link,
                        "has_attachment": field.has_attachment,
                        "id": field.id,
                        "like_count": field.like_count,
                        "member": field.member,
                        "party": field.party,
                        "published": field.published,
                        "max_str": max,
                        "key_word" : key
                };
                data2.push(temp);
            };
            // console.log(temp);
            feed.collection.update({"id": field.id}, temp, {upsert: true}, function(err, records){
                    console.log("Record added as: "+field.id);
            });
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



function common_word(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount )
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}