(function() {
    'use strict';

    function UnitMathService(TaproomUnits) {
        return {
            getValidUnits: function(unitId) {
                var units = [];
                var mainUnit = _.findWhere(TaproomUnits, {
                    id: unitId
                });

                //fail early!
                if (!_.isPlainObject(mainUnit)) {
                    return units;
                }

                units.push(mainUnit);

                _.each(mainUnit.conversions, function(conv) {
                    var comparableUnit = _.findWhere(TaproomUnits, {
                        id: conv.id
                    });
                    units.push(comparableUnit);
                });
                return units;
            },
            getMaxVolume: function(origUnit, origVolume, curUnit) {
                //same unit is a 1:1 conversion
                if (parseInt(origUnit, 10) === parseInt(curUnit, 10)) {
                    return origVolume;
                }

                var errMessage = 'Invalid ids to perform max volume conversion';

                var mainUnit = _.findWhere(TaproomUnits, {
                    id: origUnit
                });
                if (!_.isPlainObject(mainUnit)) {
                    throw new Error(errMessage);
                }

                var conversion = _.findWhere(mainUnit.conversions, {
                    id: parseInt(curUnit, 10)
                });
                if (!_.isPlainObject(conversion)) {
                    throw new Error(errMessage);
                }

                return origVolume * conversion.equivalent;
            },
            convertVolumeToOriginalUnits: function(origUnit, curUnit, volume) {
                //same unit is a 1:1 conversion
                if (parseInt(origUnit, 10) === parseInt(curUnit, 10)) {
                    return volume;
                }

                var errMessage = 'Invalid ids to convert volume';
                var mainUnit = _.findWhere(TaproomUnits, {
                    id: origUnit
                });
                if (!_.isPlainObject(mainUnit)) {
                    throw new Error(errMessage);
                }

                var conversion = _.findWhere(mainUnit.conversions, {
                    id: parseInt(curUnit, 10)
                });
                if (!_.isPlainObject(conversion)) {
                    throw new Error(errMessage);
                }

                return volume / conversion.equivalent;
            }
        };
    }

    angular.module('brewbear-services')
        .factory('UnitMathService', UnitMathService);
})();