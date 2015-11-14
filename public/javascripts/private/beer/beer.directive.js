(function() {
    'use strict';

    function BeerCollection() {
        return {
            scope: {
                id: '@'
            },
            bindToController: true,
            restrict: 'E',
            templateUrl: '/javascripts/private/beer/beer.template.html',
            controller: 'BeerController',
            controllerAs: 'beerVm'
        };
    }

    angular.module('brewbear-component').directive('beers', BeerCollection);
})();
