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
                        } else {
                            //verify error status from the API
                            if (response.error) {
                                defer.resolve([]);
                            } else {
                                defer.resolve(response.data);
                            }
                        }
                    })
                    .error(function() {
                        //error robinson family!
                        defer.reject([]);
                    });
                return defer.promise;
            },
            create: function(newBeer) {
                var defer = $q.defer();
                $http.post('/beer/new', {
                        beer: newBeer
                    })
                    .success(function(response) {
                        var data = {
                            error: false,
                            id: -1
                        };
                        if (!response || (response && response.error)) {
                            data.error = true;
                            data.message = response ?
                                response.msg : 'Error creating beer';
                        } else {
                            data.id = response.id;
                        }
                        defer.resolve(data);
                    })
                    .error(function() {
                        defer.resolve({
                            error: true
                        });
                    });
                return defer.promise;
            },
            update: function(beer) {
                var defer = $q.defer();
                $http.post('/beer/edit/' + beer.id, {
                        beer: beer
                    })
                    .success(function(response) {
                        var data = {
                            error: false,
                            id: -1
                        };
                        if (!response || (response && response.error)) {
                            data.error = true;
                            data.message = response ?
                                response.msg : 'Error updating beer';
                        } else {
                            data.id = response.id;
                        }
                        defer.resolve(data);
                    })
                    .error(function() {
                        defer.resolve({
                            error: true
                        });
                    });
                return defer.promise;
            },
            remove: function(beerId) {
                var defer = $q.defer();
                $http.post('/beer/remove', {
                        id: beerId
                    }).success(function(result) {
                        defer.resolve({
                            error: result && result.error ? result.error : false
                        });
                    }).error(function() {
                        defer.resolve({
                            error: true
                        });
                    });
                return defer.promise;
            }
        };
    }

    angular.module('brewbear-services').factory('BeerService', BeerService);
})();
