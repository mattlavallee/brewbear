(function() {
    'use strict';

    function TapRoomService($http, $q) {
        function validatePostResponse(response, state) {
            var data = { error: false, id: -1 };
            if (!_.isPlainObject(response) || response.error) {
                data.error = true;
                data.message = 'Error ' + state + ' taproom entry';
            } else {
                data.id = response.id;
            }
            return data;
        }

        return {
            create: function(newTap) {
                var defer = $q.defer();
                $http.post('/taproom/new', { tap: newTap })
                    .success(function(response) {
                        defer.resolve(
                            validatePostResponse(response, 'creating')
                        );
                    })
                    .error(function() {
                        defer.resolve({ error: true });
                    });
                return defer.promise;
            }
        };
    }

    angular.module('brewbear-services')
        .factory('TapRoomService', TapRoomService);
})();
