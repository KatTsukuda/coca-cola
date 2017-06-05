// require express and other modules
var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

// parse incoming URL-encoded form data and populate req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//allow cross origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//***DATABASE***//

var db = require('./models');
var createSignData = require('./seed');
var Sign = db.Sign;

//***ROUTES***//



//***HTML ENDPOINTS***//
app.get('/', function homepage (req, res) {
    res.sendFile( __dirname + '/views/index.html');
});

// '/api' endpoint
app.get('/api', function(req, res) {
    res.json();
});

//all signs as JSON
app.get('/api/signs', function(req, res) {
    db.Sign.find(function(err, signs){
        if (err) { return console.log('index error: ' + err); }
        res.json(signs);
    });
});


//***JSON ENDPOINTS***//


//***SERVER***//

//CONNECT TO LOCAL SERVER AND HEROKU
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server on a rampage at http://localhost:3000/');
})
