var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SignsSchema = new Schema ({
    street address: String,
    city: String,
    state: String,
    description: String,
    imageURL: String
});

var Sign = mongoose.model('Sign', SignsSchema)
module.exports = Sign;
