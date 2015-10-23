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
                .query( {where: { userId: userId, active: true }, 
                    orderBy: ['name'] } )
                .fetch();
        },
        create: function( userId, newBeer ){
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
        }
    };

    module.exports = Beer;
})();