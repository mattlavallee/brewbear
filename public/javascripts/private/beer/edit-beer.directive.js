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
            controllerAs: 'beerVm',
            link: function(scope, element, attrs, ctrl) {
                scope.$watch(function() {
                    return ctrl.id;
                }, function() {
                    ctrl.id = parseInt(ctrl.id, 10);
                    //always reset the model for a cleaner transition in the
                    //event of bad latency
                    ctrl.resetActiveBeerModel();
                    //if we're editing, update that model!
                    if (ctrl.id > 0) {
                        ctrl.updateBeerModel();
                    }
                });
            }
        };
    });
})();
