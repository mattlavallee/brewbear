describe('Directive: Tap Directive', function() {
    'use strict';

    var mockScope, element, compile, httpBackend, timeout;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $httpBackend, $timeout) {
        mockScope = $rootScope.$new();
        httpBackend = $httpBackend;
        compile = $compile;
        timeout = $timeout;
    }));

    function initDirective() {
        element = compile('<taps class="tap-dir"></taps>')(mockScope);
        mockScope.$digest();
    }

    describe('directive initialization - ', function() {
        beforeEach(function() {
            spyOn(Date, 'now').and.returnValue('1');
            httpBackend.whenGET('/tap/user?1').respond(200, {});
        });

        it('verifies the directive was instantiated', function() {
            initDirective();

            expect(element).toBeDefined();
            expect(element.hasClass('tap-dir')).toEqual(true);
        });

        it('handles the refetch broadcast event', function() {
            initDirective();
            var ctrl = element.controller('taps');
            spyOn(ctrl, 'updateTaps');

            mockScope.$emit('refetch-taps');
            mockScope.$apply();
            timeout.flush();

            expect(ctrl.updateTaps.calls.count()).toEqual(1);
        });
    });
});
