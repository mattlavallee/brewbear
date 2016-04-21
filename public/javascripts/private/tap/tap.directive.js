(function() {
    'use strict';

    function TapDirective($rootScope, $timeout) {
        return {
            scope: {
                id: '@'
            },
            bindToController: true,
            restrict: 'E',
            templateUrl: '/javascripts/private/tap/tap.template.html',
            controller: 'TapController',
            controllerAs: 'tapVm',
            link: function(scope, element, attrs, ctrl) {
                $rootScope.$on('refetch-taps', function() {
                    //some latency to let the database update
                    $timeout(function() {
                        ctrl.updateTaps();
                    }, 100);
                });
            }
        };
    }

    angular.module('brewbear-component').directive('taps', TapDirective);
})();
