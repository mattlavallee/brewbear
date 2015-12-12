(function() {
    'use strict';

    function EditTaproomDirective(TaproomUnits, BeerService, TapService) {
        return {
            restrict: 'E',
            templateUrl: '/javascripts/private/taproom/edit-taproom.template.html',
            link: function(scope, element, attrs, ctrl) {
                scope.units = _.values(TaproomUnits);
                scope.availableBeers = [];
                scope.availableTaps = [];

                BeerService.getUserBeers().then(function(userBeers) {
                    scope.availableBeers = userBeers;
                });

                TapService.getUserTaps().then(function(userTaps) {
                    scope.availableTaps = userTaps;
                });
            }
        }
    }

    angular.module('brewbear-component')
        .directive('editTaproom', EditTaproomDirective);
})();