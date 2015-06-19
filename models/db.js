(function(){
    'use strict';
     var config = require('../config/configuration');
     var knex = require('knex')({
         client: 'pg',
         debug: true,
         connection: {
             host: config.database.host,
             port: config.database.port,
             user: config.database.user,
             password: config.database.password,
             database: config.database.db,
             chartset: 'utf8'
         }
     });

    module.exports = require('bookshelf')(knex);
})();