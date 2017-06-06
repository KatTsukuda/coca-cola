let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// use const to define variables as constant
const signSchema = new Schema ({
    street_address: String,
    city: String,
    state: String,
    description: String,
    image_url: String
});

const Sign = mongoose.model('Sign', signSchema)
module.exports = Sign;
