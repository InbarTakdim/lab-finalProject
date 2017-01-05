//DB schema:
var feed = require('./feed');
// var EXdata = require('./EXdata');

var http = require('http');
var url = 'http://kikar.org/api/v1/facebook_status/?limit=1000&feed__is_current=true&content__contains=%D7%A9%D7%95%D7%90%D7%94&published__gte=2016-11-01';
// var url = 'http://kikar.org/api/v1/facebook_status/?limit=1000&feed__is_current=true&content__contains=%D7%A9%D7%95%D7%90%D7%94&published__gte=2016-11-01';
// var url = 'https://api.twitter.com/1.1/search/tweets.json?q=%D7%A9%D7%95%D7%90%D7%94%20OR%20%D7%90%D7%A0%D7%98%D7%99%D7%A9%D7%9E%D7%99%D7%95%D7%AA&since_id=33473850';
var body = '', data;

http = http.get(url, function(res){
    
    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        data= JSON.parse(body);
        console.log('done!');
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
exports.updateDB = function(req, res){

    var newFeed =[]; 
    // newFeed.push({
    //     "meta":{
    //         "limit": data.meta.limit,
    //         "total_count": data.meta.total_count
    //     }
    // });
    // feed.collection.update({"meta" : data.m },[[obj, "upsert"], function(err, records){
    //             console.log("Record added as ");
    //     }]);
    data.objects.forEach(function(obj){
        if (obj.has_attachment ==null){
            newFeed.push({
                "objects":{
                    "content": obj.content,
                    "content_snippet": obj.content_snippet,
                    "facebook_link": obj.facebook_link,
                    "has_attachment": false,
                    "id": obj.id,
                    "like_count": obj.like_count,
                    "member": obj.member,
                    "party": obj.party,
                    "published": obj.published
                }
            })
        }
        else{
            newFeed.push({
                "objects":{
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
                }
            });
        };
        feed.collection.update({"id": obj.id}, obj, {upsert: true}, function(err, records){
                console.log("Record added as: "+obj.id);
        });
    });
    console.log(newFeed)
    // console.log(newFeed);
// for(var exKey in data) {
//         console.log("key:"+exKey+", value:"+data[exKey]);
        

//  }
 // console.log(newFeed);
    // data.objects.forEach(function(element){
    //     console.log(element);
    // })
    // var newFeed =
    //     {
    //         "meta": 
    //             {
    //             "limit": 100,
    //             "total_count": 45
    //             },
    //         "objects": 
    //         [
    //             {
    //                 "attachment": {
    //                     "is_photo": true,
    //                     "link": "https://www.facebook.com/tali.ploskov/photos/a.666281420065987.1073741847.593286400698823/1490983704262417/?type=3",
    //                     "name": "Photos from ‎Tali Ploskov - טלי פלוסקוב‎'s post",
    //                     "picture": "https://fb-s-b-a.akamaihd.net/h-ak-xap1/v/t1.0-0/s130x130/15873255_1490983704262417_3086307015277792185_n.jpg?oh=270a4452bc0ca0c09c7ad475021428e0&oe=58DEE5E5&__gda__=1494733274_d982ced2e5e80b98ce21fd91bac2d3b3",
    //                     "source": "https://scontent.xx.fbcdn.net/v/t1.0-9/15873255_1490983704262417_3086307015277792185_n.jpg?oh=2cf08e2f450d4dca37e0b6655b68cf41&oe=58D7CD8E",
    //                 },
    //                 "content": "טוב, לזה לא ציפיתי.\n\nקיבלתי פנייה דחופה מקבוצת קשישים, ניצולי שואה, מנהריה \nשביקשו להיפגש איתי.\n\nבדרך כלל, במפגשים מהסוג הזה, אני שומעת על הבעיות שעולות. וכאלה, לצערי, לא חסר.\n\nאבל הפעם- הם הזמינו אותי בשביל להגיד תודה.\n\nהם רצו להגיד לי תודה באופן אישי על החוק שהצלחתי להעביר לפני קצת יותר מחודש. חוק שהוסיף להם ולעוד כ- 6,600 ניצולי שואה, קצבה של כ- 1,300 ₪ בחודש.\n\nלא הצלחתי לעצור את הדמעות כשהם ניגשו אלי עם זרי הפרחים.\n\nשנמשיך לעשות ולהצליח.\n\nשלכם,\nטלי.",
    //                 "content_snippet": "<p>טוב, לזה לא ציפיתי.</p>\n\n<p>קיבלתי פנייה דחופה מקבוצת קשישים, ניצולי <b>שואה</b>, מנהריה <br />שביקשו להיפגש איתי.</p>\n\n<p>בדרך כלל, במפגשים מהסוג הזה, אני שומעת על הבעיות שעולות. וכאלה, לצערי, לא חסר.</p>\n\n<p>אבל הפעם- הם הזמינו אותי בשביל להגיד תודה.</p>\n\n<p>הם רצו להגיד לי תודה באופן אישי על החוק שהצלחתי להעביר לפני קצת יותר מחודש. חוק שהוסיף להם ולעוד כ- 6,600 ניצולי <b>שואה</b>, קצבה של כ- 1,300 ₪ בחודש.</p>\n\n<p>לא הצלחתי לעצור את הדמעות כשהם ניגשו אלי עם זרי הפרחים.</p>\n\n<p>שנמשיך לעשות ולהצליח.</p>\n\n<p>שלכם,<br />טלי.</p>",
    //                 "facebook_link": "https://www.facebook.com/593286400698823/posts/1490988984261889",
    //                 "has_attachment": true,
    //                 "id": 118920,
    //                 "like_count": 107,
    //                 "member": "טלי פלוסקוב",
    //                 "party": "כולנו",
    //                 "publication_restricted": false,
    //                 "published": "2017-01-03T19:18:15"
    //             },
    //             {
    //                 "attachment": {
    //                     "is_photo": true,
    //                     "link": "https://www.facebook.com/tali.ploskov/photos/a.666281420065987.1073741847.593286400698823/1490983704262417/?type=3",
    //                     "name": "Photos from ‎Tali Ploskov - טלי פלוסקוב‎'s post",
    //                     "picture": "https://fb-s-b-a.akamaihd.net/h-ak-xap1/v/t1.0-0/s130x130/15873255_1490983704262417_3086307015277792185_n.jpg?oh=270a4452bc0ca0c09c7ad475021428e0&oe=58DEE5E5&__gda__=1494733274_d982ced2e5e80b98ce21fd91bac2d3b3",
    //                     "source": "https://scontent.xx.fbcdn.net/v/t1.0-9/15873255_1490983704262417_3086307015277792185_n.jpg?oh=2cf08e2f450d4dca37e0b6655b68cf41&oe=58D7CD8E",
    //                 },
    //                 "content": "טוב, לזה לא ציפיתי.\n\nקיבלתי פנייה דחופה מקבוצת קשישים, ניצולי שואה, מנהריה \nשביקשו להיפגש איתי.\n\nבדרך כלל, במפגשים מהסוג הזה, אני שומעת על הבעיות שעולות. וכאלה, לצערי, לא חסר.\n\nאבל הפעם- הם הזמינו אותי בשביל להגיד תודה.\n\nהם רצו להגיד לי תודה באופן אישי על החוק שהצלחתי להעביר לפני קצת יותר מחודש. חוק שהוסיף להם ולעוד כ- 6,600 ניצולי שואה, קצבה של כ- 1,300 ₪ בחודש.\n\nלא הצלחתי לעצור את הדמעות כשהם ניגשו אלי עם זרי הפרחים.\n\nשנמשיך לעשות ולהצליח.\n\nשלכם,\nטלי.",
    //                 "content_snippet": "<p>טוב, לזה לא ציפיתי.</p>\n\n<p>קיבלתי פנייה דחופה מקבוצת קשישים, ניצולי <b>שואה</b>, מנהריה <br />שביקשו להיפגש איתי.</p>\n\n<p>בדרך כלל, במפגשים מהסוג הזה, אני שומעת על הבעיות שעולות. וכאלה, לצערי, לא חסר.</p>\n\n<p>אבל הפעם- הם הזמינו אותי בשביל להגיד תודה.</p>\n\n<p>הם רצו להגיד לי תודה באופן אישי על החוק שהצלחתי להעביר לפני קצת יותר מחודש. חוק שהוסיף להם ולעוד כ- 6,600 ניצולי <b>שואה</b>, קצבה של כ- 1,300 ₪ בחודש.</p>\n\n<p>לא הצלחתי לעצור את הדמעות כשהם ניגשו אלי עם זרי הפרחים.</p>\n\n<p>שנמשיך לעשות ולהצליח.</p>\n\n<p>שלכם,<br />טלי.</p>",
    //                 "facebook_link": "https://www.facebook.com/593286400698823/posts/1490988984261889",
    //                 "has_attachment": true,
    //                 "like_count": 107,
    //                 "member": "טלי פלוסקוב",
    //                 "party": "כולנו",
    //                 "publication_restricted": false,
    //                 "published": "2017-01-03T19:18:15"
    //             }
    //         ]
    //     };
        // res.send(newFeed);
        // var document = {name:"David", title:"About MongoDB"};
        // newFeed.objects.forEach(function(obj){
        //     feed.collection.save(obj, function(err, records){
        //         console.log("Record added as ");
        //     });
        res.send(newFeed);
        // })   
        
        

    // var query = ;
    // query.exec((err, data) => {
    //     query = newFeeds.save((err) => {
    //         if (err) return res.send(err);
    //         else res.status(200).json({"result":"DB was updated"}); 
    //     });
    // }); 
};
exports.default = function(req, res, next){
    res.send(data);
};

// exports.setFilesFlags = function(req, res){
// @@ -20,7 +55,7 @@ exports.getUsersInfo = function(req, res){
//     if(data2!=null)
//         res.send('empty');
//     else
//         res.send(data2);
//         res.send(data);
// };
// exports.feedInFiles = function(req, res){
// 
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