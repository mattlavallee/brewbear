(function() {
    'use strict';

    angular.module('brewbear-common', []);
    angular.module('brewbear-services', []);
    angular.module('brewbear-component', ['brewbear-services',
        'brewbear-common']);
    angular.module('brewbear-templates', []);
    angular.module('bb-static', []);

    var brewApp = angular.module('brewbear',
        ['bb-static', 'brewbear-templates', 'brewbear-component', 'ngRoute']);

    brewApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/javascripts/private/routes/bar.template.html',
                controller: 'BrewBearRouteController'
            })
            .when('/addBeer', {
                templateUrl:
                    '/javascripts/private/routes/add-beer.template.html',
                controller: 'BrewBearRouteController'
            })
            .when('/editBeer/:beerId', {
                templateUrl:
                    '/javascripts/private/routes/edit-beer.template.html',
                controller: 'BrewBearRouteController',
                controllerAs: 'routeController'
            })
            .when('/addTap', {
                templateUrl:
                    '/javascripts/private/routes/add-tap.template.html',
                controller: 'BrewBearRouteController'
            })
            .when('/taproom/update', {
                templateUrl:
                    '/javascripts/private/routes/update-taproom.template.html',
                controller: 'BrewBearRouteController'
            })
            .when('/taproom', {
                templateUrl:
                    '/javascripts/private/routes/taproom.template.html',
                controller: 'BrewBearRouteController'
            })
            .when('/trends', {
                templateUrl: '/javascripts/private/routes/trends.template.html',
                controller: 'BrewBearRouteController'
            })
            .when('/account', {
                templateUrl:
                    '/javascripts/private/routes/account.template.html',
                controller: 'BrewBearRouteController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
