(function() {
    'use strict';

    function TapService($http, $q) {
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
            }
        };
    }

    angular.module('brewbear-services').factory('TapService', TapService);
})();
