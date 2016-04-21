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
            templateUrl: '/javascripts/private/tap/edit-tap.template.html',
            link: function(scope, element, attrs, ctrl) {
                scope.$watch(function() {
                    return ctrl.id;
                }, function() {
                    ctrl.id = parseInt(ctrl.id, 10);
                    //always reset the model for a cleaner transition in the
                    //event of bad latency
                    ctrl.resetActiveTapModel();
                    //if we're editing, update that model!
                    if (ctrl.id > 0) {
                        ctrl.updateTapModel();
                    }
                });
            }
        };
    }

    angular.module('brewbear-component').directive('editTap', editTapDirective);
})();
