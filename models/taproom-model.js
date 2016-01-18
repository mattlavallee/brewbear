(function() {
    'use strict';

    var bookshelf = require('./db');
    var beerModel = require('./beer-model');
    var unitModel = require('./unit-model');
    var tapModel = require('./tap-model');
    var taproomHistory = require('./taproom-history-model');

    var taproomModel = bookshelf.Model.extend({
        tableName: 'barHistory',
        beer: function() {
            return this.belongsTo(beerModel.instance, 'beerId');
        },
        unit: function() {
            return this.belongsTo(unitModel.instance, 'unitId');
        },
        tap: function() {
            return this.belongsTo(tapModel.instance, 'barId');
        },
        drinks: function(){
            return this.hasMany(taproomHistory.instance, 'barId');
        }
    });

    var taproomCollection = bookshelf.Collection.extend({
        model: taproomModel
    });

    var Taproom = {
        get: function(userId) {
            return taproomCollection
                .forge()
                .query({
                    where: {
                        userId: userId,
                        active: true
                    }
                })
                .fetch({
                    withRelated: ['beer', 'unit', 'tap', 'drinks']
                });
        },
        create: function(userId, newEntry) {
            return taproomModel.forge({
                    userId: userId,
                    barId: newEntry.tap,
                    beerId: newEntry.beer,
                    volume: newEntry.volume,
                    unitId: newEntry.units
                })
                .save();
        },
        update: function(userId, taproomId, modifiedEntry) {
            return taproomModel.forge({
                id: taproomId,
                userId: userId
            }).fetch().then(function(entryToUpdate) {
                if (!entryToUpdate) {
                    return {
                        error: true
                    };
                } else {
                    entryToUpdate.save({
                        beerId: modifiedEntry.beer,
                        volume: modifiedEntry.volume,
                        unitId: modifiedEntry.units
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
        kick: function(userId, taproomId) {
            return taproomModel.forge({
                id: taproomId,
                userId: userId
            }).fetch().then(function(entryToKick) {
                if (!entryToKick) {
                    return {
                        error: true
                    };
                } else {
                    entryToKick.save({
                        active: false
                    }).then(function() {
                        return {
                            error: false
                        };
                    }).catch(function() {
                        return {
                            error: true
                        };
                    });
                }
            });
        },
        delete: function(userId, taproomId) {
            return taproomModel.forge({
                id: taproomId,
                userId: userId
            }).fetch().then(function(entryToDelete) {
                if (!entryToDelete) {
                    return {
                        error: true
                    };
                } else {
                    entryToDelete.destroy()
                        .then(function() {
                            return {
                                error: false
                            };
                        })
                        .catch(function(err) {
                            return {
                                error: true
                            };
                        });
                }
            });
        }
    };

    module.exports = Taproom;
})();
