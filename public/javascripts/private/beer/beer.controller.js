(function() {
    'use strict';

    function BeerCtrl(BeerService) {
        var vm = this;

        vm.beers = [];
        BeerService.getUserBeers().then(function(result) {
            vm.beers = result;
        });
    }

    angular.module('brewbear-component').controller('BeerController', BeerCtrl);
})();
