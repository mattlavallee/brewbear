(function() {
    'use strict';

    function TapService($http, $q) {
        function validatePostResponse(response, state) {
            var data = { error: false, id: -1 };
            if (!_.isPlainObject(response) || response.error) {
                data.error = true;
                data.message = 'Error ' + state + ' tap';
            } else {
                data.id = response.id;
            }
            return data;
        }

        return {
            getUserTaps: function() {
                var defer = $q.defer();
                $http.get('/tap/user')
                    .success(function(response) {
                        //validate response object
                        if (!_.isPlainObject(response) || response.error) {
                            defer.resolve([]);
                        }
                        else {
                            //return data from the service
                            defer.resolve(response.data);
                        }
                    })
                    .error(function() {
                        //Ruh Roh Scooby!  Something's wrong
                        defer.reject([]);
                    });
                return defer.promise;
            },
            create: function(newTap) {
                var defer = $q.defer();
                $http.post('/tap/new', { tap: newTap })
                    .success(function(response) {
                        defer.resolve(
                            validatePostResponse(response, 'creating')
                        );
                    })
                    .error(function() {
                        defer.resolve({ error: true });
                    });
                return defer.promise;
            },
            update: function(tap) {
                var defer = $q.defer();
                $http.post('/tap/edit/' + tap.id, { tap: tap })
                    .success(function(response) {
                        defer.resolve(
                            validatePostResponse(response, 'updating')
                        );
                    })
                    .error(function() {
                        defer.resolve({ error: true });
                    });
                return defer.promise;
            }
        };
    }

    angular.module('brewbear-services').factory('TapService', TapService);
})();
