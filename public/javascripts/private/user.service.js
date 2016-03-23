(function() {
    'use strict';

    function UserService($q, $http) {
        return {
            getUser: function() {
                var defer = $q.defer();
                $http.get('/users').success(function(result) {
                    defer.resolve(result);
                }).error(function() {
                    defer.resolve({
                        error: true
                    });
                });
                return defer.promise;
            },
            updateUser: function(user) {
                var defer = $q.defer();
                $http.post('/users/edit/' + user.id, {
                        user: user
                    })
                    .success(function(result) {
                        defer.resolve(result);
                    }).error(function() {
                        defer.resolve({
                            error: true
                        });
                    });
                return defer.promise;
            }
        };
    }

    angular.module('brewbear-services')
        .factory('UserService', UserService);
})();
