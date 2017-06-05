var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var signSchema = new Schema ({
    street_address: String,
    city: String,
    state: String,
    description: String,
    image_url: String
});

var Sign = mongoose.model('Sign', signSchema)
module.exports = Sign;
