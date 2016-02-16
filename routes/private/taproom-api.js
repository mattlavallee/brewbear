(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var userAuth = require('../helpers/authentication');
    var TapRoom = require('../../models/taproom-model');
    var TaproomHistory = require('../../models/taproom-history-model');

    router.get('/user', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            TapRoom.get(req.user.id).then(function(taproomEntries) {
                res.json({
                    error: false,
                    data: taproomEntries.toJSON()
                });
            }).catch(function(err) {
                res.json({
                    error: true,
                    message: err
                });
            });
        }
    });

    router.post('/new', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var taproomObj = req.body.entry;

            TapRoom.create(req.user.id, taproomObj)
                .then(function(newEntry) {
                    res.json({
                        error: false,
                        id: newEntry.get('id')
                    });
                })
                .catch(function() {
                    res.status(500).json({
                        error: true,
                        msg: 'There was an error saving your taproom entry'
                    });
                });
        }
    });

    router.post('/kickTap', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var tapId = req.body.tapId;

            TapRoom.kick(req.user.id, tapId)
                .then(function(response) {
                    res.json({
                        error: response.error,
                        id: tapId
                    });
                })
                .catch(function() {
                    res.status(500).json({
                        error: true,
                        msg: 'There was an error kicking the tap'
                    });
                });
        }
    });

    router.post('/deleteTap', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var tapId = req.body.tapId;

            TapRoom.delete(req.user.id, tapId)
                .then(function(response) {
                    res.json({
                        error: response ? response.error : false,
                        id: tapId
                    });
                })
                .catch(function() {
                    res.status(500).json({
                        error: true,
                        msg: 'There was an error deleting the tap'
                    });
                });
        }
    });

    router.post('/pourDrink', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var taproomId = req.body.taproomId;
            var volume = req.body.volume;

            //verify that the taproom we are pouring for is owned
            //by the authenticated user!
            TapRoom.get(req.user.id).then(function(taproomEntries) {
                taproomEntries.mapThen(function(entry) {
                    return entry.get('id') === taproomId;
                }).then(function(taprooms) {
                    //at least 1 entry from the collection matches our taproom
                    if (taprooms.indexOf(true) !== -1) {
                        TaproomHistory.logDrink(taproomId, volume)
                            .then(function() {
                                res.json({
                                    error: false,
                                    id: taproomId
                                });
                            })
                            .catch(function(err) {
                                res.json({
                                    error: true,
                                    message: err
                                });
                            });
                    } else {
                        res.json({
                            error: true,
                            message:
                                'Taproom Entry is not owned by the active user'
                        });
                    }
                });
            }).catch(function(err) {
                res.json({
                    error: true,
                    message: err
                });
            });

        }
    });
    module.exports = router;
})();
