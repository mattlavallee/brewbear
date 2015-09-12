(function(){
    'use strict';

    var bookshelf = require('./db');

    var beerModel = bookshelf.Model.extend({
        tableName: 'beer'
    });

    var beerCollection = bookshelf.Collection.extend({
        model: beerModel
    });

    var Beer = {
        get: function( userId ){
            return beerCollection
                .forge()
                .query( {where: { userId: userId }, orderBy: ['name'] } )
                .fetch();
        }
    };

    module.exports = Beer;
})();