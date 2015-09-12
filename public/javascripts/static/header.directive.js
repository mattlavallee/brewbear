(function(){
    'use strict';

    var HeaderDirective = function(){
        return {
            templateUrl: '/javascripts/static/header.template.html',
            restrict: 'E'
        };
    };

    angular.module('bb-static').directive('brewBearHeader', HeaderDirective);
})();