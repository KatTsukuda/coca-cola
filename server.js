// require express and other modules
var express = require('express'),
    app = express();

//***DATABASE***//


//***ROUTES***//


//***HTML ENDPOINTS***//


//***JSON ENDPOINTS***//


//***SERVER***//

//CONNECT TO LOCAL SERVER AND HEROKU
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server on a rampage at http://localhost:3000/');
})
