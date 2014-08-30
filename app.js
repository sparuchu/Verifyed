/**
 * Module dependencies.
 */

var app = require('./config/express')(),
    config = require('./config/config')(),
    express = require('express');


/**
 * Router
*/

var router = express.Router();
require('./router')(app);


// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});


// Start the app by listening on <port>
app.listen(config.port, function() {
    console.log(
            'Successfully connected to couch://' + config.couch.host + ':' + config.couch.port,
            '\nExpress server listening on port ' + config.port
    );
});

module.exports = app;
module.exports = {
    sayHelloInEnglish: function() {
        return "HELLO";
    },

    sayHelloInSpanish: function() {
        return "Hola";
    }
};