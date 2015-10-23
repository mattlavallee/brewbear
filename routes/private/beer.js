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

    router.post('/new', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var beerObj = req.body.beer;

            Beer.create(req.user.id, beerObj)
                .then(function(newBeer) {
                    res.json({error:false, id: newBeer.get('id') });
                })
                .otherwise(function() {
                    res.status(500).json({
                        error:true,
                        msg: 'There was an error saving your beer'
                    });
                });
        }
    });

    module.exports = router;
})();
