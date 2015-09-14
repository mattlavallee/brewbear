(function() {
    'use strict';

    function BeerCollection() {
        return {
            restrict: 'E',
            templateUrl: '/javascripts/private/beer/beer.template.html',
            controller: 'BeerController',
            controllerAs: 'beerVm'
        };
    }

    angular.module('brewbear-component').directive('beers', BeerCollection);
})();
