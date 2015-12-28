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
        instance: tapModel,
        get: function( userId ){
            return tapCollection
                .forge()
                .query( {where: { userId: userId, active: true }, 
                    orderBy: ['name'] } )
                .fetch({withRelated: ['type']});
        },
        create: function( userId, newTap ){
            return tapModel.forge({
                userId: userId,
                name: newTap.name,
                typeId: newTap.typeId
            })
            .save();
        },
        update: function( userId, tapId, modifiedTap ){
            return tapModel.forge({
                id: tapId,
                userId: userId
            }).fetch().then(function(tapToUpdate){
                if(!tapToUpdate){
                    return { error: true };
                } else{
                    //can only update the name...type will be set in stone
                    tapToUpdate.save({
                        name: modifiedTap.name
                    }).then(function(){
                        return {error: false };
                    }).otherwise(function(){
                        return {error: true };
                    });
                }
            });
        }
    };

    module.exports = Tap;
})();