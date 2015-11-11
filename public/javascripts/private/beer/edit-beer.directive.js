(function() {
    'use strict';

    angular.module('brewbear-component').directive('editBeer', function() {
        return {
            restrict: 'E',
            scope: {
                id: '='
            },
            bindToController: true,
            templateUrl: '/javascripts/private/beer/edit-beer.template.html',
            controller: 'BeerController',
            controllerAs: 'beerVm'
        };
    });
})();
