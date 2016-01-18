(function() {
    'use strict';

    var bookshelf = require('./db');

    var taproomHistoryModel = bookshelf.Model.extend({
        tableName: 'drinkHistory'
    });
    var taproomHistoryCollection = bookshelf.Collection.extend({
        model: taproomHistoryModel
    });

    var TaproomHistory = {
        instance: taproomHistoryModel,
        logDrink: function(taproomId, volume) {
            return taproomHistoryModel.forge({
                barId: taproomId,
                numUnits: volume
            }).save();
        }
    };

    module.exports = TaproomHistory;
})();