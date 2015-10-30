(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var path = require('path');
    var userAuth = require('../helpers/authentication');

    //GET the authentication home page
    router.get('/bar', function(req, res) {
        if (userAuth.userValidated(req, res, true)) {
            res.sendFile(
                path.join(__dirname, '../../views/private/', 'index.html'));
        }
    });

    module.exports = router;
})();
