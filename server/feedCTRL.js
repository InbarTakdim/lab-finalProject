//DB schema config:
var feed = require('./feed'); 

var request = require('request');
<<<<<<< HEAD
//var request = require('sync-request');
=======
>>>>>>> origin/master

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

<<<<<<< HEAD
var body =' ', data1 = [];
=======
var body = '', data1 = [];
>>>>>>> origin/master

//Always run:   
urlSet.forEach(function(url, i){
   request(url, function (error, response, _body) {
        if (!error && response.statusCode == 200) {
            body+=_body;
            console.log('***done: '+i+'***');
<<<<<<< HEAD
            data1[i]=JSON.parse(_body);
=======
            data1.push(JSON.parse(_body));
>>>>>>> origin/master
            // console.log(data1);
        }
        else{
            console.log(error);
        }
<<<<<<< HEAD
    });
=======
    })
>>>>>>> origin/master
});


exports.default = function(req, res, next){
    var data2 =[], temp={}; 
<<<<<<< HEAD
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
            var stopList=["-","על","אם", "את","של" ,"כי","הם" ,"גם", "אבל", "היה", "יום" ,"?" ,"היא" ,"לא", "כן","", ",", "מספרים" , "שהוא" , "כמו", "זה", "וגם" , "כך", "מה" , "רק", "היום"];
            var index=-1;
            var indexes = [];
            var p=-1;

            for (var k=0; k<stopList.length; k++)
            {
                p=-1;
                while ((p = str.indexOf(stopList[k], p+1)) != -1)
                {   
                    console.log("word: "+ stopList[k] + " searching from index = " + (p+1));
                    console.log("before splice: "+ str);
                    str.splice(p, 1);
                    console.log("after splice: "+ str);
                    console.log("-- "+ p);
                    p=p-1;
                }
            }
            
            max=common_word(str);



=======
    data1.forEach(function(obj, i){
        obj.objects.forEach(function(field){
>>>>>>> origin/master
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
<<<<<<< HEAD
                        "max_str": max,
                        "key_word" : key
=======
                        "max_str": null
>>>>>>> origin/master
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
<<<<<<< HEAD
                        "max_str": max,
                        "key_word" : key
=======
                        "max_str": null
>>>>>>> origin/master
                };
                data2.push(temp);
            };
            // console.log(temp);
            feed.collection.update({"id": field.id}, temp, {upsert: true}, function(err, records){
                    console.log("Record added as: "+field.id);
            });
        });
<<<<<<< HEAD
    });
    res.send(data2);
=======
    })
    res.send(data2 );
>>>>>>> origin/master
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
<<<<<<< HEAD



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
=======
>>>>>>> origin/master
