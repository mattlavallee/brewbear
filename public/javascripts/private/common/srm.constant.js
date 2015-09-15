(function() {
    'use strict';

    angular.module('brewbear-common').constant('SRM', {
        PaleStraw: {
            low: -0.1,
            high: 2,
            color: 'srm-paleStraw'
        },
        Straw: {
            low: 2,
            high: 3,
            color: 'srm-straw'
        },
        PaleGold: {
            low: 3,
            high: 4,
            color: 'srm-paleGold'
        },
        DeepGold: {
            low: 4,
            high: 6,
            color: 'srm-deepGold'
        },
        PaleAmber: {
            low: 6,
            high: 9,
            color: 'srm-paleAmber'
        },
        MediumAmber: {
            low: 9,
            high: 12,
            color: 'srm-mediumAmber'
        },
        DeepAmber: {
            low: 12,
            high: 15,
            color: 'srm-deepAmber'
        },
        AmberBrown: {
            low: 15,
            high: 18,
            color: 'srm-amberBrown'
        },
        Brown: {
            low: 18,
            high: 20,
            color: 'srm-brown'
        },
        RubyBrown: {
            low: 20,
            high: 24,
            color: 'srm-rubyBrown'
        },
        DeepBrown: {
            low: 24,
            high: 30,
            color: 'srm-deepBrown'
        },
        Black: {
            low: 30,
            high: 999999999,
            color: 'srm-black'
        }
    });
})();
