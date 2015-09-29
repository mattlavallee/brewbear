describe('Directive: Create Beer Directive', function() {
    'use strict';

    var mockScope, element, compile;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile) {
        mockScope = $rootScope.$new();
        compile = $compile;
    }));

    function initDirective() {
        var html = '<create-beer is-new="false" class="cb-dir"></create-beer>';
        element = compile(html)(mockScope);
        mockScope.$digest();
    }

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            initDirective();

            expect(element).toBeDefined();
            expect(element.hasClass('cb-dir')).toEqual(true);
        });
    });
});
