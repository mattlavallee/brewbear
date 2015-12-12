(function() {
    'use strict';

    angular.module('brewbear-common').constant('TaproomUnits', {
        Count: {
            id: 1,
            name: 'Count',
            abbreviation: 'ct'
        },
        Ounces: {
            id: 2,
            name: 'Ounces',
            abbreviation: 'oz'
        },
        Pints: {
            id: 3,
            name: 'Pints',
            abbreviation: 'pt'
        },
        Gallons: {
            id: 4,
            name: 'Gallons',
            abbreviation: 'gal'
        },
        Milliliters: {
            id: 5,
            name: 'Milliliters',
            abbreviation: 'ml'
        },
        Liters: {
            id: 6,
            name: 'Liters',
            abbreviation: 'l'
        }
    });
})();
