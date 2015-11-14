(function() {
    'use strict';

    function TapCtrl(TapService) {
        var vm = this;

        vm.taps = [];
        TapService.getUserTaps().then(function(userTaps) {
            vm.taps = userTaps;
        });
    }

    angular.module('brewbear-component').controller('TapController', TapCtrl);
})();
