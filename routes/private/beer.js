(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var userAuth = require('../helpers/authentication');
    var Beer = require('../../models/beer');

    router.get('/user', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            Beer.get(req.user.id).then(function(beers) {
                res.json({ error: false, data: beers.toJSON()});
            }).catch(function(err) {
                res.json({error: true, message: err});
            });
        }
    });

    module.exports = router;
})();
