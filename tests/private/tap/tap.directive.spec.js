describe('Directive: Tap Directive', function() {
    'use strict';

    var mockScope, element, compile, httpBackend;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $httpBackend) {
        mockScope = $rootScope.$new();
        httpBackend = $httpBackend;
        compile = $compile;
    }));

    function initDirective() {
        element = compile('<taps class="tap-dir"></taps>')(mockScope);
        mockScope.$digest();
    }

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            httpBackend.whenGET('/tap/user').respond(200, {});

            initDirective();

            expect(element).toBeDefined();
            expect(element.hasClass('tap-dir')).toEqual(true);
        });
    });
});
