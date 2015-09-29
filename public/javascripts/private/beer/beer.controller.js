(function() {
    'use strict';

    var beerTemplate = {
        name: '',
        style: '',
        abv: 0.0,
        originalGravity: 1.00,
        finalGravity: 1.00,
        notes: '',
        srm: 0.0
    };

    function BeerCtrl(BeerService, SRM, $location) {
        var vm = this;

        vm.model = _.cloneDeep(beerTemplate);
        //if we aren't creating a new model
        if (vm.isNew === 'false') {
            vm.beers = [];
            BeerService.getUserBeers().then(function(result) {
                vm.beers = result;
            });
        }

        vm.getSrmColor = function(srmAsNumber) {
            srmAsNumber = Number(srmAsNumber);

            var srm = _.find(SRM, function(curSrm) {
                return srmAsNumber > curSrm.low && srmAsNumber <= curSrm.high;
            });
            return srm.color;
        };

        vm.createBeer = function(isValid) {
            if (isValid) {
                BeerService.create(vm.model).then(function(result) {
                    if (result.error) {
                        //TODO: error handling sucks
                    }
                    $location.path('/');
                });
            }
        };
    }

    angular.module('brewbear-component').controller('BeerController', BeerCtrl);
})();
