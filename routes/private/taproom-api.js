(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var userAuth = require('../helpers/authentication');

    router.post('/new', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            var tapObj = req.body.tap;

            res.json(tapObj);
        }
    });

    module.exports = router;
})();
