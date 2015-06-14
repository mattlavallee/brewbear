(function() {
    'use strict';

    var configVals = require('../config/configuration');
    var express = require('express');
    var router = express.Router();
    //authentication modules
    var passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new GoogleStrategy({
            clientID: configVals.google.clientId,
            clientSecret: configVals.google.clientSecret,
            callbackURL: configVals.google.callback
        },
        function(token, tokenSecret, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            });
        }
    ));

    //GET users listing
    router.get('/', function(req, res) {
        res.send('respond with a resource');
    });

    //GET Google login entry point
    router.get('/google', passport.authenticate('google',
        { scope: ['https://www.googleapis.com/auth/plus.login'] }));

    router.get('/google/return',
        passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/my/beers');
            });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    module.exports = router;
})();
