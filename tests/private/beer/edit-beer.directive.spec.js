describe('Directive: Edit Beer Directive', function() {
    'use strict';

    var mockScope, element, compile, beerService, q;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, _BeerService_, $q) {
        mockScope = $rootScope.$new();
        compile = $compile;
        beerService = _BeerService_;
        q = $q;

        spyOn(beerService, 'getUserBeers').and.callFake(function() {
            var defer = q.defer();
            defer.resolve([]);
            return defer.promise;
        });
    }));

    function initDirective() {
        var html = '<edit-beer id="20" class="cb-dir"></edit-beer>';
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
