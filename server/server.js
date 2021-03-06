//DB & CTRL config:
var db = require('./database')
var feedCTRL = require('./feedCTRL');
// var EXdata = require('./EXdata');

//Server config:
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


//App settings:
app.set('port',port);
app.use('/', express.static('./public/'));

//Path parsing:
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    next();
});

//Routes and Callbacks:
app.get('/',function(req, res, next){
    feedCTRL.default(req, res, next);
    req.next();
});

// app.get('/updateDB', feedCTRL.updateDB);

app.get('/getAllFeeds', feedCTRL.getAllFeeds);

app.get('/getAllMembers', feedCTRL.getAllMembers);

app.get('/getFeedsByName/:member', feedCTRL.getFeedsByName);

app.get('/getFeedsFromTo/:from/:to', feedCTRL.getFeedsFromTo);


app.listen(port);

//Connection indicator:
console.log('listening on port' + port);
