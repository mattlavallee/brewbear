describe('Directive: Edit Tap Directive', function() {
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
        var html = '<edit-tap id="-1" class="edit-tap"></edit-tap>';
        element = compile(html)(mockScope);
        mockScope.$apply();
    }

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            initDirective();

            expect(element).toBeDefined();
            expect(element.hasClass('edit-tap')).toEqual(true);
        });
    });
});
