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

    router.post('/new', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var tapObj = req.body.tap;

            Tap.create(req.user.id, tapObj)
                .then(function(newTap) {
                    res.json({ error:false, id: newTap.get('id') });
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).json({
                        error: true,
                        msg: 'There was an error saving your tap'
                    });
                });
        }
    });

    router.post('/edit/:tapId', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var tapObj = req.body.tap;

            Tap.update(req.user.id, req.params.tapId, tapObj)
                .then(function() {
                    res.json({ error: false, id: req.params.tapId });
                })
                .catch(function() {
                    res.status(500).json({
                        error: true,
                        msg: 'There was an error editing your beer'
                    });
                });
        }
    });

    module.exports = router;
})();
