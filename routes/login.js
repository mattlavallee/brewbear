(function() {
    'use strict';

    var configVals = require('../config/configuration');
    var User = require('../models/user');
    var express = require('express');
    var router = express.Router();
    //authentication modules
    var passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        FacebookStrategy = require('passport-facebook').Strategy;

    passport.serializeUser(function(user, done) {
        User.insert(user).then(function() {
            done(null, user);
        });
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
                /*console.log(profile.id);
                console.log(profile.displayName);
                console.log(profile.emails[0].value);
                console.log(profile.photos[0].value);*/
                return done(null, profile);
            });
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: configVals.facebook.clientId,
            clientSecret: configVals.facebook.clientSecret,
            callbackURL: configVals.facebook.callback,
            profileFields: ['id', 'displayName', 'about', 'emails']
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            });
        }
    ));

    //GET Google login entry point
    router.get('/google', passport.authenticate('google',
        { scope: ['https://www.googleapis.com/auth/plus.profile.emails.read'] }
    ));

    router.get('/google/return',
        passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                // Successful authentication, redirect to auth home.
                res.redirect('/my/beers');
            });

    router.get('/facebook', passport.authenticate('facebook'));

    router.get('/facebook/return',
        passport.authenticate('facebook', {failureRedirect: '/'}),
        function(req, res) {
            //Successful authentication, redirect to auth home
            res.redirect('/my/beers');
        });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    module.exports = router;
})();
