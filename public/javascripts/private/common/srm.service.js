(function() {
    'use strict';

    function SrmFactory(SRM) {
        return {
            getColor: function(srmNumber) {
                srmNumber = Number(srmNumber);

                if (isNaN(srmNumber)) {
                    throw new Error('Provided SRM was not a number');
                }

                return _.find(SRM, function(curSrm) {
                    return srmNumber > curSrm.low &&
                        srmNumber <= curSrm.high;
                });
            }
        };
    }

    angular.module('brewbear-common').factory('SrmService', SrmFactory);
})();
