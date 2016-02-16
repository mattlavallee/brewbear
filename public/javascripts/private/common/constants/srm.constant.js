(function() {
    'use strict';

    angular.module('brewbear-common').constant('SRM', {
        PaleStraw: {
            low: -0.1,
            high: 2,
            color: 'srm-paleStraw',
            hex: '#ffff45'
        },
        Straw: {
            low: 2,
            high: 3,
            color: 'srm-straw',
            hex: '#ffe93c'
        },
        PaleGold: {
            low: 3,
            high: 4,
            color: 'srm-paleGold',
            hex: '#fed849'
        },
        DeepGold: {
            low: 4,
            high: 6,
            color: 'srm-deepGold',
            hex: '#ffa846'
        },
        PaleAmber: {
            low: 6,
            high: 9,
            color: 'srm-paleAmber',
            hex: '#f49f44'
        },
        MediumAmber: {
            low: 9,
            high: 12,
            color: 'srm-mediumAmber',
            hex: '#d77f59'
        },
        DeepAmber: {
            low: 12,
            high: 15,
            color: 'srm-deepAmber',
            hex: '#94523a'
        },
        AmberBrown: {
            low: 15,
            high: 18,
            color: 'srm-amberBrown',
            hex: '#804541'
        },
        Brown: {
            low: 18,
            high: 20,
            color: 'srm-brown',
            hex: '#5b342f'
        },
        RubyBrown: {
            low: 20,
            high: 24,
            color: 'srm-rubyBrown',
            hex: '#4c3b2b'
        },
        DeepBrown: {
            low: 24,
            high: 30,
            color: 'srm-deepBrown',
            hex: '#38302e'
        },
        Black: {
            low: 30,
            high: 999999999,
            color: 'srm-black',
            hex: '#31302c'
        }
    });
})();
