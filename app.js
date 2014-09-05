/**
 * Module dependencies.
 */

var app = require('./config/express')(),
    config = require('./config/config')(),
    couchbase = require('couchbase'),
    express = require('express');

/**
 * Database
 */
var db = new couchbase.Connection({
    'bucket':config.couch.bucket,
    'host': config.couch.host + ':' + config.couch.port
}, function(err, db) {
    if (err) {
        // Failed to make a connection to the Couchbase cluster.
        throw err;
    }
    else  {
        console.log(
                'Successfully connected to couchbase://' + config.couch.host + ':' + config.couch.port + ':' + config.couch.bucket
        );
    }
});

app.use(function(req,res,next){
    req.db = db;
    next();
});

/**
 * Routes
 */
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    next();
});


// Start the app by listening on <port>
app.listen(config.port, function() {
    console.log(
            'Express server listening on port ' + config.port
    );
});

module.exports = app;
