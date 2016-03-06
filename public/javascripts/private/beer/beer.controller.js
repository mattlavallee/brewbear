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

    function BeerCtrl(BeerService, SrmService, $location) {
        var vm = this;

        vm.model = _.cloneDeep(beerTemplate);
        vm.error = false;
        vm.notFoundError = null;
        //if we aren't creating/updating a model
        if (!vm.id) {
            vm.beers = [];
            BeerService.getUserBeers().then(function(result) {
                vm.beers = result;
            });
        } else if (parseInt(vm.id, 10) !== -1) {
            vm.id = parseInt(vm.id, 10);
            vm.beers = [];
            BeerService.getUserBeers().then(function(result) {
                var selectedBeer = _.findWhere(result, {
                    id: vm.id
                });
                if (selectedBeer) {
                    vm.model = selectedBeer;
                } else {
                    vm.notFoundError = true;
                }
            });
        }

        vm.getSrmColor = function(srmAsNumber) {
            return SrmService.getColor(srmAsNumber).color;
        };

        vm.saveBeer = function(isValid) {
            vm.error = false;
            if (isValid) {
                var fn = BeerService.create;
                if (vm.id !== -1) {
                    fn = BeerService.update;
                }
                return fn(vm.model).then(function(result) {
                    if (result.error) {
                        vm.error = true;
                    } else {
                        $location.path('/');
                    }
                });
            } else {
                vm.error = true;
            }
        };

        vm.deleteBeer = function(beerId) {
            BeerService.remove(beerId).then(function(result) {
                if (result.error === false) {
                    _.remove(vm.beers, function(beer) {
                        return beer.id === beerId;
                    });
                }
            });
        };
    }

    angular.module('brewbear-component').controller('BeerController', BeerCtrl);
})();
