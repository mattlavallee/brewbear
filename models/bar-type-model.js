(function(){
    'use strict';

    var bookshelf = require('./db');

    var barTypeModel = bookshelf.Model.extend({
        tableName: 'barType'
    });

    var barTypeCollection = bookshelf.Collection.extend({
        model: barTypeModel
    });

    var BarType = {
        instance: barTypeModel,
        get: function(){
            return barTypeCollection
                .forge()
                .query( {where: { active: true }, 
                    orderBy: ['name'] } )
                .fetch();
        }
    };

    module.exports = BarType;
})();