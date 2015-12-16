(function() {
    'use strict';

    function EditTaproomDirective(TaproomUnits, BeerService, TapService,
        TapRoomService) {
        //Gets the user's collection of available beers and taps
        function initializeCollections(scope) {
            scope.availableBeers = [];
            scope.availableTaps = [];

            BeerService.getUserBeers().then(function(userBeers) {
                scope.availableBeers = userBeers;
            });

            TapService.getUserTaps().then(function(userTaps) {
                scope.availableTaps = userTaps;
            });
        }

        return {
            restrict: 'E',
            templateUrl:
                '/javascripts/private/taproom/edit-taproom.template.html',
            link: function(scope) {
                scope.units = _.values(TaproomUnits);
                initializeCollections(scope);

                //entry point to add a new tap to the user's taproom
                scope.addToTaproom = function(isValidForm) {
                    scope.formError = false;
                    if (isValidForm) {
                        TapRoomService.create(scope.model)
                            .then(function() {});
                    } else {
                        scope.formError = true;
                    }
                };
            }
        };
    }

    angular.module('brewbear-component')
        .directive('editTaproom', EditTaproomDirective);
})();
