(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var userAuth = require('../helpers/authentication');
    var Tap = require('../../models/tap-model');

    router.get('/user', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            Tap.get(req.user.id).then(function(taps) {
                res.json({ error: false, data: taps.toJSON()});
            }).catch(function(err) {
                res.json({error: true, message: err});
            });
        }
    });

    module.exports = router;
})();
