(function() {
    'use strict';

    angular.module('brewbear')
    .controller('BrewBearRouteController', function($routeParams) {
        this.params = $routeParams;
    });
})();
