(function() {
    'use strict';

    function TapCtrl(TapService, BarType, $location) {
        var vm = this;

        vm.taps = [];
        vm.notFoundError = false;
        vm.model = {
            name: '',
            typeId: ''
        };
        vm.types = _.values(BarType);

        if (!vm.id) {
            TapService.getUserTaps().then(function(userTaps) {
                vm.taps = userTaps;
            });
        } else if (parseInt(vm.id, 10) !== -1) {
            //fetch the model to edit
            vm.id = parseInt(vm.id, 10);
            TapService.getUserTaps().then(function(userTaps) {
                var selectedTap = _.findWhere(userTaps, {
                    id: vm.id
                });
                if (selectedTap) {
                    vm.model = selectedTap;
                    vm.model.typeId = vm.model.typeId.toString();
                } else {
                    vm.notFoundError = true;
                }
            });
        }

        vm.saveTap = function(isValid) {
            vm.error = false;
            if (isValid) {
                var fn = TapService.create;
                if (vm.id !== -1) {
                    fn = TapService.update;
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
    }

    angular.module('brewbear-component').controller('TapController', TapCtrl);
})();
