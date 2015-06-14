(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var path = require('path');

    /* GET listing. */
    router.get('/', function(req, res) {
        res.send('respond with a resource');
    });

    router.get('/beers', function(req, res) {
        /*for(var prop in req.user){
            if(req.user.hasOwnProperty(prop)){
                console.log(prop + ': ' + req.user[prop]);
            }
        }*/
        res.sendFile(
            path.join(__dirname, '../../views/private/', 'index.html'));
    });

    module.exports = router;
})();
