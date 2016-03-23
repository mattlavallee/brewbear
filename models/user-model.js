(function(){
    'use strict';

    var bookshelf = require('./db');
    var Q = require('q');

    var userModel = bookshelf.Model.extend({
        tableName: 'user'
    });

    var User = {
        insert: function( profile ) {
            var deferred = Q.defer();

            var id = profile.id;
            var name = profile.displayName;
            var email = '';
            if(profile.emails !== null &&  profile.emails !== undefined) {
                email = profile.emails[0].value;
            }

            new userModel({'id': id}).fetch().then(function(user) {
                //user is already in our database, carry on
                if(user !== null) {
                    deferred.resolve(true);
                }
                else {
                    new userModel()
                        .save({ 'id': id, 'name': name, 'email': email})
                        .then(function(newUserModel) {
                            if(newUserModel === null) { //failed to insert
                                console.log('User insert failed');
                                deferred.reject(false);
                            }
                            else {
                                deferred.resolve(true);
                            }
                        });
                }
            });

            return deferred.promise;
        },
        get: function( userId ){
            return userModel
                .forge()
                .query({
                    where: {
                        id: userId
                    }
                })
                .fetch();
        },
        update: function( userId, userObj ){
            return userModel.forge({
                id: userId,
            }).fetch().then(function(userToUpdate) {
                if (!userToUpdate) {
                    return {
                        error: true
                    };
                } else {
                    userToUpdate.save({
                        name: userObj.name,
                        email: userObj.email
                    }).then(function() {
                        return {
                            error: false
                        };
                    }).otherwise(function() {
                        return {
                            error: true
                        };
                    });
                }
            });
        }
    };

    module.exports = User;
})();