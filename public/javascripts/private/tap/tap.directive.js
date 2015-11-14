(function() {
    'use strict';

    function TapDirective() {
        return {
            scope: {
                id: '@'
            },
            bindToController: true,
            restrict: 'E',
            templateUrl: '/javascripts/private/tap/tap.template.html',
            controller: 'TapController',
            controllerAs: 'tapVm'
        };
    }

    angular.module('brewbear-component').directive('taps', TapDirective);
})();
