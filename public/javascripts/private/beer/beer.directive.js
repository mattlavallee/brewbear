(function() {
    'use strict';

    function BeerCollection($rootScope, $timeout) {
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
                    //some latency to let the database update
                    $timeout(function() {
                        ctrl.updateBeers();
                    }, 100);
                });
            }
        };
    }

    angular.module('brewbear-component').directive('beers', BeerCollection);
})();
