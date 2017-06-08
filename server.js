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


// clear seed data entries on reload to prevent compiling
Sign.deleteMany({}, function(err) {
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
            {method: 'DELETE', path: '/api/signs/:id', description: 'Destroy a sign entry'},
            {method: 'PUT', path: '/api/signs/:id', description: 'Edit an entry'}
        ]
    });
});
// show entry by id as JSON
app.get('/api/signs/:id', function showSign(req, res) {
    let id = req.params.id;

    Sign.findOne({_id: id}, function (err, sign) {
        res.json(sign);
    });
})
// create new sign
app.post('/api/signs', function signsCreate(req, res) {
    // object of post request containing data for the signs.js
    let newSign = new Sign(req.body);

    newSign.save(function (err, sign) {
        res.json(sign);
    });
});

//all signs as JSON
app.get('/api/signs', function index(req, res) {
    Sign.find({}, function(err, signs) {
        res.json(signs);
    });
});

//delete one sign using id
app.delete('/api/signs/:id', function destroy(req, res) {
    Sign.findOneAndRemove({_id: req.params.id}, function (err, sign) {
        res.json(sign);
    })
    // let signID = req.params.id;
    // Sign.findOneAndRemove({ _id: signID }, function(err, deletedSign) {
    //     console.log('delete sign info: ', deletedSign)
    //     res.json(deletedSign);
    // });
});

//edit one sign using id
app.put('/api/signs/:id', function update(req, res) {
    //get sign id from url params
    Sign.findById(req.params.id, function(err, sign) {

        //update sign attributes
        sign.street_address = req.body.street_address;
        sign.city = req.body.city;
        sign.state = req.body.state;
        sign.image_url = req.body.image_url;
        sign.description = req.body.description;
        // save updated sign in DATABASE
        if (sign.save()) {
            res.json(sign);
        }
        else {
            res.send('sign cannot be saved :(')
        }
    });
});

//***SERVER***//

//CONNECT TO LOCAL SERVER AND HEROKU
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server on a rampage at http://localhost:3000/');
})
