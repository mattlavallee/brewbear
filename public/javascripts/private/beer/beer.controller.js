(function() {
    'use strict';

    function BeerCtrl(BeerService, SRM) {
        var vm = this;

        vm.beers = [];
        BeerService.getUserBeers().then(function(result) {
            vm.beers = result;
        });

        vm.getSrmColor = function(srmAsNumber) {
            var srm = _.find(SRM, function(curSrm) {
                return srmAsNumber > curSrm.low && srmAsNumber <= curSrm.high;
            });
            return srm.color;
        };
    }

    angular.module('brewbear-component').controller('BeerController', BeerCtrl);
})();
