(function() {
    'use strict';

    angular.module('brewbear-component').directive('createBeer', function() {
        return {
            restrict: 'E',
            templateUrl: '/javascripts/private/beer/create-beer.template.html',
            controller: 'BeerController',
            controllerAs: 'beerVm'
        };
    });
})();
