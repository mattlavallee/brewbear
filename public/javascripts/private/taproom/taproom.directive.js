(function() {
    'use strict';

    function TaproomDirective(TapRoomService, UnitMathService, SRM) {
        return {
            restrict: 'E',
            templateUrl: '/javascripts/private/taproom/taproom.template.html',
            link: function(scope) {
                scope.taproomEntries = [];
                scope.activeTaproomEntry = {};

                //initialize active taps in the taproom
                TapRoomService.getUserEntries().then(function(entries) {
                    scope.taproomEntries = entries;
                });

                scope.setTap = function(taproomId, unitId, volume) {
                    scope.activeTaproomEntry = {
                        taproomId: taproomId,
                        originalUnits: unitId,
                        originalVolume: volume,
                        currentVolume: 0,
                        currentUnits: unitId.toString(),
                        validUnits: UnitMathService.getValidUnits(unitId),
                        maxVolume: UnitMathService.getMaxVolume(
                            unitId, volume, unitId)
                    };
                };

                scope.getSrmColor = function(srmAsNumber) {
                    srmAsNumber = Number(srmAsNumber);

                    return _.find(SRM, function(curSrm) {
                        return srmAsNumber > curSrm.low &&
                            srmAsNumber <= curSrm.high;
                    });
                };

                scope.zeroOutVolume = function() {
                    scope.activeTaproomEntry.currentVolume = 0;
                    scope.activeTaproomEntry.maxVolume =
                        UnitMathService.getMaxVolume(
                            scope.activeTaproomEntry.originalUnits,
                            scope.activeTaproomEntry.originalVolume,
                            scope.activeTaproomEntry.currentUnits);
                };

                scope.cancelPour = function() {
                    scope.activeTaproomEntry = {};
                };

                scope.pourMyDrink = function() {
                    var curUnits =
                        parseInt(scope.activeTaproomEntry.currentUnits, 10);
                    if (scope.activeTaproomEntry.currentVolume > 0 &&
                        curUnits >= 0) {
                        var volumeInOriginalUnits =
                            UnitMathService.convertVolumeToOriginalUnits(
                                scope.activeTaproomEntry.originalUnits,
                                scope.activeTaproomEntry.currentUnits,
                                scope.activeTaproomEntry.currentVolume
                            );

                        TapRoomService.pourDrink(
                            scope.activeTaproomEntry.taproomId,
                            volumeInOriginalUnits
                        ).then(function() {
                            var taproomEntry =
                                _.findWhere(scope.taproomEntries, {
                                    id: scope.activeTaproomEntry.taproomId
                                });
                            taproomEntry.drinks.push({
                                id: (new Date()).getTime(),
                                date: new Date(),
                                numUnits: volumeInOriginalUnits,
                                varId: taproomEntry.barId
                            });

                            scope.cancelPour(); //close pour dialog
                        });
                    }

                };

                scope.calculateRemainingVolume = function(taproomEntryId) {
                    var entry = _.findWhere(scope.taproomEntries, {
                        id: taproomEntryId
                    });
                    if (entry) {
                        var volume = 0;
                        _.each(entry.drinks, function(drink) {
                            volume += drink.numUnits;
                        });
                        return entry.volume - volume;
                    }
                    return '-';
                };

                scope.volumeAsPercentage = function(taproomEntry) {
                    var remainingVolume =
                        scope.calculateRemainingVolume(taproomEntry.id);
                    return (remainingVolume / taproomEntry.volume) * 100;
                };
            }
        };
    }

    angular.module('brewbear-component')
        .directive('taproom', TaproomDirective);
})();
