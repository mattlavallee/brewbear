(function() {
    'use strict';

    var bookshelf = require('./db');

    var beerModel = bookshelf.Model.extend({
        tableName: 'beer'
    });

    var beerCollection = bookshelf.Collection.extend({
        model: beerModel
    });

    var Beer = {
        instance: beerModel,
        get: function(userId) {
            return beerCollection
                .forge()
                .query({
                    where: {
                        userId: userId,
                        active: true
                    },
                    orderBy: ['name']
                })
                .fetch();
        },
        create: function(userId, newBeer) {
            return beerModel.forge({
                    userId: userId,
                    name: newBeer.name,
                    style: newBeer.style,
                    abv: newBeer.abv,
                    originalGravity: newBeer.originalGravity,
                    finalGravity: newBeer.finalGravity,
                    srm: newBeer.srm,
                    notes: newBeer.notes
                })
                .save();
        },
        update: function(userId, beerId, modifiedBeer) {
            return beerModel.forge({
                id: beerId,
                userId: userId
            }).fetch().then(function(beerToUpdate) {
                if (!beerToUpdate) {
                    return {
                        error: true
                    };
                } else {
                    beerToUpdate.save({
                        name: modifiedBeer.name,
                        style: modifiedBeer.style,
                        abv: modifiedBeer.abv,
                        originalGravity: modifiedBeer.originalGravity,
                        finalGravity: modifiedBeer.finalGravity,
                        srm: modifiedBeer.srm,
                        notes: modifiedBeer.notes
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
        },
        remove: function(userId, beerId) {
            return beerModel.forge({
                id: beerId,
                userId: userId
            }).fetch().then(function(beerToRemove) {
                if (!beerToRemove) {
                    return {
                        error: true
                    };
                } else {
                    beerToRemove.save({
                        active: false
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

    module.exports = Beer;
})();
