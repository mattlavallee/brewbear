describe('Service: SrmService', function() {
    'use strict';

    var factory, SRM;
    beforeEach(module('brewbear-common'));

    beforeEach(inject(function(_SrmService_, _SRM_) {
        factory = _SrmService_;
        SRM = _SRM_;
    }));

    describe('getColor - ', function() {
        it('Throws an error if a number is not provided', function() {
            expect(function() {
                factory.getColor('red');
            }).toThrowError('Provided SRM was not a number');
        });

        it('returns the color object', function() {
            var result = factory.getColor(10);
            expect(result).toEqual(SRM.MediumAmber);
        });

        it('returns undefined if number does not match a color', function() {
            var result = factory.getColor(-1);
            expect(result).not.toBeDefined();
        });
    });
});
