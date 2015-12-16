describe('Directive: EditTaproom', function() {
    'use strict';

    var mockScope, element, compile, beerService, tapService, tapRoomService,
        q, timeout;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $q, $timeout,
        _BeerService_, _TapService_, _TapRoomService_) {
        mockScope = $rootScope.$new();
        compile = $compile;
        q = $q;
        timeout = $timeout;

        beerService = _BeerService_;
        tapService = _TapService_;
        tapRoomService = _TapRoomService_;

        spyOn(beerService, 'getUserBeers').and.callFake(function() {
            return q.resolve([{}]);
        });
        spyOn(tapService, 'getUserTaps').and.callFake(function() {
            return q.resolve([{}, {}]);
        });
        spyOn(tapRoomService, 'create').and.callFake(function() {
            return q.resolve({});
        });
    }));

    function initDirective() {
        var html = '<edit-taproom class="edit-taproom"></edit-tap>';
        element = compile(html)(mockScope);
        mockScope.$apply();
    }

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            initDirective();
            timeout.flush();

            expect(element).toBeDefined();
            expect(element.hasClass('edit-taproom')).toEqual(true);

            expect(mockScope.availableTaps.length).toEqual(2);
            expect(mockScope.availableBeers.length).toEqual(1);
            expect(mockScope.units.length).toBeGreaterThan(1);
        });
    });

    describe('addToTaproom function - ', function() {
        it('sets an error boolean when form is invalid', function() {
            initDirective();
            timeout.flush();

            mockScope.addToTaproom(false);

            expect(mockScope.formError).toEqual(true);
        });

        it('Calls the service to create the new taproom entry', function() {
            initDirective();
            timeout.flush();

            mockScope.addToTaproom(true);
            timeout.flush();

            expect(tapRoomService.create.calls.count()).toEqual(1);
        });
    });
});
