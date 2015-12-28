(function(){
    'use strict';

    var bookshelf = require('./db');

    var unitModel = bookshelf.Model.extend({
        tableName: 'units'
    });

    var unitCollection = bookshelf.Collection.extend({
        model: unitModel
    });

    var Units = {
        instance: unitModel,
        get: function(){
            return unitCollection
                .forge()
                .query( {where: { active: true }, 
                    orderBy: ['unit'] } )
                .fetch();
        }
    };

    module.exports = Units;
})();