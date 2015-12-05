(function() {
    'use strict';

    function editTapDirective() {
        return {
            scope: {
                id: '='
            },
            bindToController: true,
            restrict: 'E',
            controller: 'TapController',
            controllerAs: 'tapVm',
            templateUrl: '/javascripts/private/tap/edit-tap.template.html'
        };
    }

    angular.module('brewbear-component').directive('editTap', editTapDirective);
})();
