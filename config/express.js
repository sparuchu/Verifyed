'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    http = require('http'),
    exphbs = require('express3-handlebars'),
    errorhandler = require('errorhandler'),
    helpers = require('../lib/helpers'),
    couchbase = require('couchbase'),
    _ = require('lodash'),
    glob = require('glob'),
    config = require('./config')(),
    compress = require('compression'),
    methodOverride = require('method-override');

module.exports = function() {
    // Initialize express app
    var app = express();

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser('verifyed'));
    app.use(session());

    // Database
    var dbcouch = new couchbase.Connection({
        'bucket':config.couch.bucket,
        'host': config.couch.host + ':' + config.couch.port
    }, function(err) {
        if (err) {
            // Failed to make a connection to the Couchbase cluster.
            throw err;
        }
    });

    // Handlers
    var errorHandler = require('errorhandler');

    // Init the express application
    app.use(express.static(path.join('./public/')));

    // Showing stack errors
    app.set('showStackError', true);

    // Create `ExpressHandlebars` instance with a default layout.
    var hbs = exphbs.create({
        helpers: require('../public/javascripts/handle_helpers.js').helpers,
        partialsDir: [
            './views/partials/'
        ]
    });

    // Register `hbs` as our view engine using its bound `engine()` function.
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // Enable jsonp
    app.enable('jsonp callback');

    // CookieParser should be above session
    app.use(cookieParser());

    return app;
};