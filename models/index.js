var mongoose = require('mongoose');
// use native JS promise library instaed of Moongoose's deprecated one
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||
"mongodb://localhost/coca-cola");

module.exports.Sign = require("./signs.js")
