(function() {
    'use strict';

    function BeerCollection($rootScope) {
        return {
            scope: {
                id: '@'
            },
            bindToController: true,
            restrict: 'E',
            templateUrl: '/javascripts/private/beer/beer.template.html',
            controller: 'BeerController',
            controllerAs: 'beerVm',
            link: function(scope, element, attrs, ctrl) {
                $rootScope.$on('refetch-beers', function() {
                    ctrl.updateBeers();
                });
            }
        };
    }

    angular.module('brewbear-component').directive('beers', BeerCollection);
})();
