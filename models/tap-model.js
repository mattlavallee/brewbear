(function(){
    'use strict';

    var bookshelf = require('./db');
    var barTypeModel = require('./bar-type-model');

    var tapModel = bookshelf.Model.extend({
        tableName: 'bar',
        type: function() {
            return this.belongsTo(barTypeModel.instance, 'typeId');
        }
    });


    var tapCollection = bookshelf.Collection.extend({
        model: tapModel
    });

    var Tap = {
        get: function( userId ){
            return tapCollection
                .forge()
                .query( {where: { userId: userId, active: true }, 
                    orderBy: ['name'] } )
                .fetch({withRelated: ['type']});
        }
    };

    module.exports = Tap;
})();