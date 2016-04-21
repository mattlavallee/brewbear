(function() {
    'use strict';

    function TapCtrl(TapService, BarType, $rootScope) {
        var vm = this;

        vm.resetActiveTapModel = function() {
            vm.model = {
                name: '',
                tapId: ''
            };
        };

        vm.notFoundError = false;
        vm.types = _.values(BarType);
        vm.activeTapId = -1;
        vm.resetActiveTapModel();

        vm.updateTaps = function() {
            TapService.getUserTaps().then(function(userTaps) {
                vm.taps = userTaps;
            });
        };

        vm.updateTapModel = function() {
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
        };

        if (!vm.id) {
            vm.taps = [];
            vm.updateTaps();
        } else if (parseInt(vm.id, 10) !== -1) {
            //fetch the model to edit
            vm.id = parseInt(vm.id, 10);
            vm.taps = [];
            vm.updateTapModel();
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
                        vm.closeTapDialog();
                        $rootScope.$emit('refetch-taps');
                    }
                });
            } else {
                vm.error = true;
            }
        };

        vm.updateActiveTapId = function(id) {
            vm.activeTapId = id;
        };

        vm.closeTapDialog = function() {
            angular.element('.add-edit-tap-modal').modal('hide');
        };
    }

    angular.module('brewbear-component').controller('TapController', TapCtrl);
})();
