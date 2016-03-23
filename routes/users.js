(function() {
    'use strict';

    var express = require('express');
    var userAuth = require('./helpers/authentication');
    var User = require('../models/user-model');

    var router = express.Router();

    /* GET users listing. */
    router.get('/', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            User.get(req.user.id).then(function(dbUser) {
                res.json({
                    user: dbUser
                });
            });
        }
    });

    router.post('/edit/:userId', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var userObj = req.body.user;

            User.update(req.user.id, userObj)
                .then(function() {
                    res.json({
                        error: false
                    });
                })
                .otherwise(function() {
                    res.status(500).json({
                        error: true
                    });
                });
        }
    });

    module.exports = router;
})();
