(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var path = require('path');
    var userAuth = require('./helpers/authentication');

    /* GET home page. */
    router.get('/', function(req, res) {
        if (userAuth.userValidated(req, res, false)) {
            res.sendFile(path.join(__dirname, '../views', 'index.html'));
        }
    });

    module.exports = router;
})();
