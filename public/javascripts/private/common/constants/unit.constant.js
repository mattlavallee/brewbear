(function() {
    'use strict';

    angular.module('brewbear-common').constant('TaproomUnits', {
        Count: {
            id: 1,
            name: 'Count',
            abbreviation: 'ct',
            step: 1,
            conversions: []
        },
        Ounces: {
            id: 2,
            name: 'Ounces',
            abbreviation: 'oz',
            step: 1,
            conversions: []
        },
        Pints: {
            id: 3,
            name: 'Pints',
            abbreviation: 'pt',
            step: 1,
            conversions: [
                { id: 2, equivalent: 16 }
            ]
        },
        Gallons: {
            id: 4,
            name: 'Gallons',
            abbreviation: 'gal',
            step: 0.1,
            conversions: [
                { id: 2, equivalent: 128 },
                { id: 3, equivalent: 8 }
            ]
        },
        Milliliters: {
            id: 5,
            name: 'Milliliters',
            abbreviation: 'ml',
            step: 1,
            conversions: []
        },
        Liters: {
            id: 6,
            name: 'Liters',
            abbreviation: 'l',
            step: 0.1,
            conversions: [
                { id: 5, equivalent: 1000 }
            ]
        }
    });
})();
