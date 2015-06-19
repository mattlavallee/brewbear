(function(){
    'use strict';
    
    var pg = require('pg');
    var configVals = require('../config/configuration');
    var Q = require('q');
    
    var User = {
        insert: function( profile ) {
            var deferred = Q.defer();
            
            var id = profile.id;
            var name = profile.displayName;
            var email = '';
            if(profile.emails !== null &&  profile.emails !== undefined) {
                email = profile.emails[0].value;
            }
            
            pg.connect(configVals.database.connString, 
                function(err, client, done) {

                if(err) {
                    console.log('Could not connect to database');
                    deferred.reject(false);
                }
                
                client.query('SELECT * FROM "user" WHERE "id" = $1', [id],
                    function(err, results) {
                        if(err) {
                            client.end();
                            deferred.reject(false);
                        }

                        if(results.rows.length > 0) {
                            client.end();
                            deferred.resolve(true);
                        }
                        else {
                            client.query('INSERT INTO "user"' + 
                                '(id, name, email) VALUES($1, $2, $3)', 
                                [id, name, email], function(err){
                                    client.end();
                                    if(err){
                                        deferred.reject(false);
                                    }
                                    else{
                                        deferred.resolve(true);
                                    }
                                });
                        }
                    });
            });
            return deferred.promise;
        } 
    };
    
    module.exports = User;
})();