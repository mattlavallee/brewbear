describe('Directive: Beer Directive', function() {
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
        element = compile('<beers class="beer-dir"></beers>')(mockScope);
        mockScope.$digest();
    }

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            httpBackend.whenGET('/beer/user').respond(200, {});

            initDirective();

            expect(element).toBeDefined();
            expect(element.hasClass('beer-dir')).toEqual(true);
        });

        it('updates the beer model on the event', function() {
            httpBackend.whenGET('/beer/user').respond(200, {});

            initDirective();
            var controller = element.controller('beers');
            spyOn(controller, 'updateBeers');

            mockScope.$emit('refetch-beers');
            mockScope.$apply();

            expect(controller.updateBeers).toHaveBeenCalled();
        });
    });
});
