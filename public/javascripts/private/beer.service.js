(function() {
    'use strict';

    function BeerService($http, $q) {
        return {
            getUserBeers: function() {
                var defer = $q.defer();
                $http.get('/beer/user')
                    .success(function(response) {
                        //verify response object from the API
                        if (!response) {
                            defer.resolve([]);
                        }
                        else {
                            //verify error status from the API
                            if (response.error) {
                                defer.resolve([]);
                            }
                            else {
                                defer.resolve(response.data);
                            }
                        }
                    })
                    .error(function() {
                        //error robinson family!
                        defer.reject([]);
                    });
                return defer.promise;
            }
        };
    }

    angular.module('brewbear-services').factory('BeerService', BeerService);
})();
