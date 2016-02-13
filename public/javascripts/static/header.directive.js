(function() {
    'use strict';

    function HeaderDirective($location) {
        function handlePathUpdate(newPath, parent) {
            //remove the current active class
            parent.find('li.active').removeClass('active');

            var newActiveClass;
            switch (newPath) {
                case '/taproom':
                    newActiveClass = '.bb-nav-tap';
                    break;
                case '/trends':
                    newActiveClass = '.bb-nav-trends';
                    break;
                case '/account':
                    newActiveClass = '.bb-nav-profile';
                    break;
                default:
                    newActiveClass = '.bb-nav-bar';
            }

            parent.find(newActiveClass).addClass('active');
        }

        return {
            templateUrl: '/javascripts/static/header.template.html',
            restrict: 'E',
            link: function(scope, element) {
                scope.$watch(function() {
                    return $location.path();
                }, function(newPath) {
                    handlePathUpdate(newPath, element);
                });
            }
        };
    }

    angular.module('bb-static')
        .directive('brewBearHeader', HeaderDirective);
})();
