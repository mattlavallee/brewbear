(function() {
    'use strict';

    function TapRoomService($http, $q) {
        function validatePostResponse(response, state) {
            var data = {
                error: false,
                id: -1
            };
            if (!_.isPlainObject(response) || response.error) {
                data.error = true;
                data.message = 'Error ' + state + ' taproom entry';
            } else {
                data.id = response.id;
            }
            return data;
        }

        return {
            getUserEntries: function() {
                var defer = $q.defer();
                $http.get('/taproom/user')
                    .success(function(response) {
                        //validate response object
                        if (!_.isPlainObject(response) || response.error) {
                            defer.resolve([]);
                        } else {
                            //return data from the service
                            defer.resolve(response.data);
                        }
                    })
                    .error(function() {
                        defer.resolve([]);
                    });
                return defer.promise;
            },
            create: function(newTap) {
                var defer = $q.defer();
                $http.post('/taproom/new', {
                        entry: newTap
                    })
                    .success(function(response) {
                        defer.resolve(
                            validatePostResponse(response, 'creating')
                        );
                    })
                    .error(function() {
                        defer.resolve({
                            error: true
                        });
                    });
                return defer.promise;
            },
            kickTap: function(kickedTapId) {
                var defer = $q.defer();
                $http.post('/taproom/kickTap', {
                        tapId: kickedTapId
                    })
                    .success(function(response) {
                        defer.resolve(
                            validatePostResponse(response, 'kicking')
                        );
                    })
                    .error(function() {
                        defer.resolve({
                            error: true
                        });
                    });
                return defer.promise;
            },
            deleteTap: function(deletedTapId) {
                var defer = $q.defer();
                $http.post('/taproom/deleteTap', {
                        tapId: deletedTapId
                    })
                    .success(function(response) {
                        defer.resolve(
                            validatePostResponse(response, 'deleting')
                        );
                    })
                    .error(function() {
                        defer.resolve({
                            error: true
                        });
                    });
                return defer.promise;
            }
        };
    }

    angular.module('brewbear-services')
        .factory('TapRoomService', TapRoomService);
})();
