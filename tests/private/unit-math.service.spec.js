describe('Service: UnitMathService', function() {
    'use strict';

    var factory, TaproomUnits;
    beforeEach(module('brewbear-services', 'brewbear-common',
        'brewbear-templates'));

    beforeEach(inject(function(_UnitMathService_, _TaproomUnits_) {
        factory = _UnitMathService_;
        TaproomUnits = _TaproomUnits_;
    }));

    describe('getValidUnits - ', function() {
        it('returns an empty array for an invalid id', function() {
            var result = factory.getValidUnits(-1);
            expect(result).toEqual([]);
        });

        it('Gets a single item if there are no conversions', function() {
            var result = factory.getValidUnits(1);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(1);
        });

        it('gets a unit and its available conversion units', function() {
            var result = factory.getValidUnits(4);
            expect(result.length).toEqual(3);
        });
    });

    describe('getMaxVolume - ', function() {
        it('throws error for invalid conversion', function() {
            expect(function() {
                factory.getMaxVolume(-1, 42, 1);
            }).toThrowError('Invalid ids to perform max volume conversion');

            expect(function() {
                factory.getMaxVolume(1, 42, -1);
            }).toThrowError('Invalid ids to perform max volume conversion');
        });

        it('returns the input volume for no conversion', function() {
            var result = factory.getMaxVolume(1, 42, 1);
            expect(result).toEqual(42);
        });

        it('properly converts to the new unit', function() {
            var galUnit = 4;
            var vol = 2;
            var pintUnit = 3;
            var result = factory.getMaxVolume(galUnit, vol, pintUnit);
            expect(result).toEqual(16);
        });
    });

    describe('convertVolumeToOriginalUnits - ', function() {
        it('throws error for invalid conversion', function() {
            expect(function() {
                factory.convertVolumeToOriginalUnits(-1, 1, 25);
            }).toThrowError('Invalid ids to convert volume');

            expect(function() {
                factory.convertVolumeToOriginalUnits(1, -1, 25);
            }).toThrowError('Invalid ids to convert volume');
        });

        it('returns the input volume for no conversion', function() {
            var result = factory.convertVolumeToOriginalUnits(1, 1, 25);
            expect(result).toEqual(25);
        });

        it('properly converts to the new unit', function() {
            var result = factory.convertVolumeToOriginalUnits(4, 3, 24);
            expect(result).toEqual(3);
        });
    });
});