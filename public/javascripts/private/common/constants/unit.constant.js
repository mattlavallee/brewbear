(function() {
    'use strict';

    angular.module('brewbear-common').constant('TaproomUnits', {
        Count: {
            id: 1,
            name: 'Count',
            abbreviation: 'ct',
            conversions: []
        },
        Ounces: {
            id: 2,
            name: 'Ounces',
            abbreviation: 'oz',
            conversions: []
        },
        Pints: {
            id: 3,
            name: 'Pints',
            abbreviation: 'pt',
            conversions: [
                { id: 2, equivalent: 16 }
            ]
        },
        Gallons: {
            id: 4,
            name: 'Gallons',
            abbreviation: 'gal',
            conversions: [
                { id: 2, equivalent: 128 },
                { id: 3, equivalent: 8 }
            ]
        },
        Milliliters: {
            id: 5,
            name: 'Milliliters',
            abbreviation: 'ml',
            conversions: []
        },
        Liters: {
            id: 6,
            name: 'Liters',
            abbreviation: 'l',
            conversions: [
                { id: 5, equivalent: 1000 }
            ]
        }
    });
})();
