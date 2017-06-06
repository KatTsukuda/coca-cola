// require express and other modules
var express = require('express'),
    app = express();

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


// clear sign entries on reload
Sign.deleteMany({}, function(err) {
    console.log('clear successful');
});

// populate seed data
createSignData();

//***ROUTES***//

app.use(express.static(__dirname + '/public'));

//***HTML ENDPOINTS***//
app.get('/', function homepage (req, res) {
    res.sendFile( __dirname + '/views/index.html');
});

//***JSON ENDPOINTS***//
// '/api' endpoint
app.get('/api', function apiIndex(req, res) {
    res.json({
        baseURL: "https://frostybear.herokuapp.com/",
        endpoints: [
            {method: 'GET', path: '/api', description: 'Describes all created'},
            {method: 'GET', path: '/api/signs', description: 'Index of all entries of signs'},
            {method: 'GET', path: '/api/signs/:id', description: 'Get sign by id'},
            {method: 'POST', path: '/api/signs', description: 'Create a new sign entry'},
            {method: 'DELETE', path: '/api/signs/:id', description: 'Destroy a sign entry'}
        ]
    });
});

// create new sign
app.post('/api/signs', function signsCreate(req, res) {
    // create new sign with form data ('req.body');
    console.log('POST REQUEST FOR DATA: ', req.body);
    // object of post request containing data for the signs.js
    var newSign = new Sign(req.body);

    newSign.save(function (err, sign) {
        if(err) {
            console.log("no sign created. try again", err);
        }
        res.json(sign);
    });
});

//all signs as JSON
app.get('/api/signs', function index(req, res) {
    Sign.find({}, function(err, signs) {
        if (err) { return console.log('index error: ' + err); }
        res.json(signs);
    });
});

//delete one sign using id
app.delete('/api/signs/:id', function destroy(req, res) {
    let signID = req.params.id;

    Sign.findOneAndRemove({ _id: signID }, function(err, deletedSign) {
        res.json(deletedSign);
    });
});

//***SERVER***//

//CONNECT TO LOCAL SERVER AND HEROKU
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server on a rampage at http://localhost:3000/');
})
