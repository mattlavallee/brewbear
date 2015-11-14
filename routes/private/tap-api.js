(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var userAuth = require('../helpers/authentication');
    //var Beer = require('../../models/beer-model');

    router.get('/user', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            res.json({ error: false, data: [1, 2, 3] });
            // Tap.get(req.user.id).then(function(taps) {
            //     res.json({ error: false, data: taps.toJSON()});
            // }).catch(function(err) {
            //     res.json({error: true, message: err});
            // });
        }
    });

    module.exports = router;
})();
