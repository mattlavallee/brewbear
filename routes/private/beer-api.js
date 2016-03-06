(function() {
    'use strict';

    var _ = require('lodash');
    var express = require('express');
    var router = express.Router();
    var userAuth = require('../helpers/authentication');
    var Beer = require('../../models/beer-model');
    var TapRoom = require('../../models/taproom-model.js');

    router.get('/user', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            //first lets get the user's active taprooms
            TapRoom.get(req.user.id).then(function(taprooms) {
                    //but we only care about the beers that are on tap
                    taprooms.mapThen(function(entry) {
                        return {
                            id: entry.get('id'),
                            beerId: entry.get('beerId')
                        };
                    }).then(function(taproomBeerMapping) {
                        //now let's do our query for all the user's beers
                        Beer.get(req.user.id).then(function(beers) {
                            //but let's mark the ones that are also on tap
                            beers.mapThen(function(beer) {
                                var beerId = beer.get('id');

                                var activeTap = _.find(taproomBeerMapping, {
                                    beerId: beerId
                                });
                                beer.set('hasActiveTap', false);
                                if (activeTap) {
                                    beer.set('hasActiveTap', true);
                                }
                                return beer;
                            }).then(function(beers) {
                                //now we can return the annotated beer objects
                                res.json({
                                    error: false,
                                    data: beers
                                });
                            });
                        }).catch(function(err) {
                            res.json({
                                error: true,
                                message: err
                            });
                        });
                    });
                })
                .catch(function(err) {
                    res.json({
                        error: true,
                        message: err
                    });
                });
        }
    });

    router.post('/new', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var beerObj = req.body.beer;

            Beer.create(req.user.id, beerObj)
                .then(function(newBeer) {
                    res.json({
                        error: false,
                        id: newBeer.get('id')
                    });
                })
                .otherwise(function() {
                    res.status(500).json({
                        error: true,
                        msg: 'There was an error saving your beer'
                    });
                });
        }
    });

    router.post('/edit/:beerId', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var beerObj = req.body.beer;

            Beer.update(req.user.id, req.params.beerId, beerObj)
                .then(function() {
                    res.json({
                        error: false,
                        id: req.params.beerId
                    });
                })
                .otherwise(function() {
                    res.status(500).json({
                        error: true,
                        msg: 'There was an error editing your beer'
                    });
                });
        }
    });

    module.exports = router;
})();
