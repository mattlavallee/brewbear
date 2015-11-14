(function() {
    'use strict';
    var express = require('express');
    var path = require('path');
    var passport = require('passport');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var expressSession = require('express-session');
    var uuid = require('uuid');

    var routes = require('./routes/index');
    var users = require('./routes/users');
    var logins = require('./routes/login');
    var beers = require('./routes/private/beer-api');
    var barHome = require('./routes/private/bar-api');
    var taps = require('./routes/private/tap-api');

    //Load configurations
    var configVals = require('./config/configuration');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/bower_components'));
    app.use(expressSession({
        genid: function() {
            return uuid.v4(); // use UUIDs for session ID
        },
        secret: configVals.sessionSecret,
        resave: false,
        saveUninitialized: false
    }));
    //Time to initalize passport!
    //Using passport.session() for persistent login sessions
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', routes);
    app.use('/users', users);
    app.use('/login', logins);
    app.use('/my', barHome);
    app.use('/beer', beers);
    app.use('/tap', taps);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    module.exports = app;
})();
