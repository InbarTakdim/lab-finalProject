//DB & CTRL config:
var db = require('./database')
var feedCTRL = require('./feedCTRL');
var EXdata = require('./EXdata');

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

//app.get('/api',feeCTRL.api);

// app.get('/getAllFiles',feedCTRL.getAllData);

app.get('/getUsersInfo',feedCTRL.getUsersInfo);

// app.post('/searchInFiles',feedCTRL.searchInFiles);

// app.get('/setFilesFlags',feedCTRL.setFilesFlags);

// app.get('/user/:username', userData.getUserByUsername);

// app.get('/recipes/:calories/:searchTerm', foods.getFoodsByCalories);

// app.post('/loginAuth', userLogin.loginAuth);

// app.get('/user/cal4today/:username/:d/:m/:y', userData.cal4today);

// app.put('/user/BMI/:username', userData.updateUserBMI);

// app.post('/register', userLogin.register);

// app.delete('/user/:username', userData.deleteUser);

app.listen(port);

//Connection indicator:
console.log('listening on port' + port);
