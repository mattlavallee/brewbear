(function() {
    'use strict';

    function EditTaproomDirective(TaproomUnits, BeerService, TapService,
        TapRoomService, SRM, $q, $timeout, $window) {
        //Gets taps and taproom entries and then filters the collection of taps
        //based on what is active in the taproom
        function getActiveTapsInTaproom(scope) {
            var tapPromise = TapService.getUserTaps().then(function(userTaps) {
                scope.availableTaps = userTaps;
            });

            var entryPromise = TapRoomService.getUserEntries()
                .then(function(entries) {
                    scope.activeEntries = entries;
                });

            $q.all([tapPromise, entryPromise]).then(function() {
                scope.availableTaps = _.reduce(scope.availableTaps,
                    function(result, tap) {
                        var entry = _.findWhere(scope.activeEntries, {
                            tap: {
                                id: tap.id
                            }
                        });
                        if (!_.isPlainObject(entry)) {
                            result.push(tap);
                        }
                        return result;
                    }, []);
            });
        }

        //Gets the user's collection of available beers and taps
        function initializeCollections(scope) {
            scope.availableBeers = [];
            scope.availableTaps = [];
            scope.activeEntries = [];

            BeerService.getUserBeers().then(function(userBeers) {
                scope.availableBeers = userBeers;
            });

            getActiveTapsInTaproom(scope);
        }

        return {
            restrict: 'E',
            templateUrl:
                '/javascripts/private/taproom/edit-taproom.template.html',
            link: function(scope) {
                function reprocessTaproom() {
                    scope.formError = false;
                    scope.model = {};
                    getActiveTapsInTaproom(scope);
                }

                scope.units = _.values(TaproomUnits);
                initializeCollections(scope);

                //entry point to add a new tap to the user's taproom
                scope.addToTaproom = function(isValidForm) {
                    scope.formError = false;
                    if (isValidForm) {
                        TapRoomService.create(scope.model)
                            .then(function(result) {
                                if (result.error === true) {
                                    scope.formError = true;
                                } else {
                                    reprocessTaproom();
                                }
                            });
                    } else {
                        scope.formError = true;
                    }
                };

                scope.kickTap = function(tapId) {
                    var continueKick = $window
                        .confirm('Proceed with kicking the tap?');
                    if (continueKick) {
                        TapRoomService.kickTap(tapId)
                            .then(function(result) {
                                if (result.error === true) {
                                    $window.alert('Error kicking the tap');
                                } else {
                                    reprocessTaproom();
                                }
                            });
                    }
                };

                scope.deleteTap = function(tapId) {
                    var continueDelete = $window
                        .confirm('Proceed with deleting the tap?');
                    if (continueDelete) {
                        TapRoomService.deleteTap(tapId)
                            .then(function(result) {
                                if (result.error === true) {
                                    $window.alert('Error deleting the tap');
                                } else {
                                    $timeout(function() {
                                        reprocessTaproom();
                                    }, 100);
                                }
                            });
                    }
                };

                scope.getSrmColor = function(srmAsNumber) {
                    srmAsNumber = Number(srmAsNumber);

                    var srm = _.find(SRM, function(curSrm) {
                        return srmAsNumber > curSrm.low && 
                            srmAsNumber <= curSrm.high;
                    });
                    return srm.color;
                };
            }
        };
    }

    angular.module('brewbear-component')
        .directive('editTaproom', EditTaproomDirective);
})();
