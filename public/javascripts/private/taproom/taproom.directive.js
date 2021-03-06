(function() {
    'use strict';

    function TaproomDirective(TapRoomService, UnitMathService, SrmService,
        TaproomUnits) {
        return {
            restrict: 'E',
            templateUrl: '/javascripts/private/taproom/taproom.template.html',
            link: function(scope, element) {
                scope.taproomEntries = [];
                scope.activeTaproomEntry = {};

                //initialize active taps in the taproom
                TapRoomService.getUserEntries().then(function(entries) {
                    scope.taproomEntries = entries;
                });

                scope.setTap = function(taproomId, unitId, volume) {
                    var validUnits = UnitMathService.getValidUnits(unitId);
                    var defaultUnit = _.find(validUnits, function(unit) {
                        return unit.isDefault === true;
                    });

                    scope.activeTaproomEntry = {
                        taproomId: taproomId,
                        originalUnits: unitId,
                        originalVolume: volume,
                        currentVolume: 1,
                        currentUnits: _.isPlainObject(defaultUnit) ?
                            defaultUnit.id.toString() : unitId.toString(),
                        validUnits: validUnits,
                        maxVolume: UnitMathService.getMaxVolume(
                            unitId, volume, unitId)
                    };
                };

                scope.getCurrentStepValue = function() {
                    var unit = _.find(TaproomUnits, {
                        id: parseInt(scope.activeTaproomEntry.currentUnits, 10)
                    });
                    if (_.isPlainObject(unit)) {
                        return unit.step;
                    }
                    //default to a step of 1
                    return 1;
                };

                scope.getSrmColor = function(srmAsNumber) {
                    return SrmService.getColor(srmAsNumber);
                };

                scope.zeroOutVolume = function() {
                    scope.activeTaproomEntry.currentVolume = 1;
                    scope.activeTaproomEntry.maxVolume =
                        UnitMathService.getMaxVolume(
                            scope.activeTaproomEntry.originalUnits,
                            scope.activeTaproomEntry.originalVolume,
                            scope.activeTaproomEntry.currentUnits);
                };

                scope.cancelPour = function() {
                    scope.activeTaproomEntry = {};
                    element.find('.pour-drink-modal').modal('hide');
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
