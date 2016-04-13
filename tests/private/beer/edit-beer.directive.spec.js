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

    describe('updates the controller based on id updates', function() {
        it('resets the model only when id is -1', function() {
            initDirective();
            var controller = element.controller('editBeer');
            spyOn(controller, 'resetActiveBeerModel');
            spyOn(controller, 'updateBeerModel');

            controller.id = -1;
            mockScope.$apply();

            expect(controller.resetActiveBeerModel.calls.count()).toEqual(1);
            expect(controller.updateBeerModel.calls.count()).toEqual(0);
        });

        it('resets and updates the model', function() {
            initDirective();
            var controller = element.controller('editBeer');
            spyOn(controller, 'resetActiveBeerModel');
            spyOn(controller, 'updateBeerModel');

            controller.id = 10;
            mockScope.$apply();

            expect(controller.resetActiveBeerModel.calls.count()).toEqual(1);
            expect(controller.updateBeerModel.calls.count()).toEqual(1);
        });
    });
});
