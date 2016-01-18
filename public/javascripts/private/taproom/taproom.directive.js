(function() {
    'use strict';

    function TaproomDirective(TapRoomService, UnitMathService) {
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
                            volumeInOriginalUnits).then(function() {
                            //TODO: subtract volume from entry in array
                        });
                    }

                };
            }
        };
    }

    angular.module('brewbear-component')
        .directive('taproom', TaproomDirective);
})();
