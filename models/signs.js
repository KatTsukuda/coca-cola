var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SignsSchema = new Schema ({
    street_address: String,
    city: String,
    state: String,
    description: String,
    image_url: String
});

var Sign = mongoose.model('Sign', SignsSchema)
module.exports = Sign;
