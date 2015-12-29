describe('Directive: EditTaproom', function() {
    'use strict';

    var mockScope, element, compile, beerService, tapService, tapRoomService,
        q, timeout, $window;
    var createSpy;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $q, $timeout,
        _BeerService_, _TapService_, _TapRoomService_, _$window_) {
        mockScope = $rootScope.$new();
        compile = $compile;
        q = $q;
        timeout = $timeout;
        $window = _$window_;

        beerService = _BeerService_;
        tapService = _TapService_;
        tapRoomService = _TapRoomService_;

        spyOn(beerService, 'getUserBeers').and.callFake(function() {
            return q.resolve([{}]);
        });
        spyOn(tapService, 'getUserTaps').and.callFake(function() {
            return q.resolve([{ id: 1 }, { id: 2 }]);
        });
        createSpy = spyOn(tapRoomService, 'create').and.callFake(function() {
            return q.resolve({});
        });
        spyOn(tapRoomService, 'getUserEntries').and.callFake(function() {
            return q.resolve([{ tap: { id: 1 } }]);
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

            //this is 1 because there is a single match in getUserEntries
            expect(mockScope.availableTaps.length).toEqual(1);
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
            expect(tapRoomService.getUserEntries.calls.count()).toEqual(1);

            mockScope.addToTaproom(true);
            timeout.flush();

            expect(tapRoomService.create.calls.count()).toEqual(1);
            expect(tapRoomService.getUserEntries.calls.count()).toEqual(2);
            expect(mockScope.formError).toEqual(false);
        });

        it('Handles an error from the taproom service', function() {
            createSpy.and.returnValue(q.resolve({
                error: true
            }));

            initDirective();
            timeout.flush();

            mockScope.addToTaproom(true);
            timeout.flush();

            expect(tapRoomService.create.calls.count()).toEqual(1);
            expect(mockScope.formError).toEqual(true);
        });
    });

    describe('kickTap function - ', function() {
        var confirmSpy;
        beforeEach(function() {
            confirmSpy = spyOn($window, 'confirm').and.returnValue(true);
            spyOn($window, 'alert');
        });

        it('Does nothing when the confirm dialog is cancelled', function() {
            confirmSpy.and.returnValue(false);
            spyOn(tapRoomService, 'kickTap').and.returnValue({});

            initDirective();
            timeout.flush();

            mockScope.kickTap(1);

            expect($window.confirm.calls.count()).toEqual(1);
            expect(tapRoomService.kickTap.calls.count()).toEqual(0);
        });

        it('Throws an error for an invalid response', function() {
            spyOn(tapRoomService, 'kickTap').and.returnValue(q.resolve({
                error: true
            }));

            initDirective();
            timeout.flush();

            mockScope.kickTap(1);
            timeout.flush();

            expect($window.confirm.calls.count()).toEqual(1);
            expect(tapRoomService.kickTap.calls.count()).toEqual(1);
            expect($window.alert.calls.count()).toEqual(1);
        });

        it('handles a successful call correctly', function() {
            spyOn(tapRoomService, 'kickTap').and.returnValue(q.resolve({
                error: false
            }));

            initDirective();
            timeout.flush();
            expect(tapRoomService.getUserEntries.calls.count()).toEqual(1);

            mockScope.kickTap(1);
            timeout.flush();

            expect($window.confirm.calls.count()).toEqual(1);
            expect(tapRoomService.kickTap.calls.count()).toEqual(1);
            expect(mockScope.formError).toEqual(false);
            expect($window.alert.calls.count()).toEqual(0);
            expect(tapRoomService.getUserEntries.calls.count()).toEqual(2);
        });
    });

    describe('deleteTap function - ', function() {
        var confirmSpy;
        beforeEach(function() {
            confirmSpy = spyOn($window, 'confirm').and.returnValue(true);
            spyOn($window, 'alert');
        });

        it('Does nothing when the confirm dialog is cancelled', function() {
            confirmSpy.and.returnValue(false);
            spyOn(tapRoomService, 'deleteTap').and.returnValue({});

            initDirective();
            timeout.flush();

            mockScope.deleteTap(1);

            expect($window.confirm.calls.count()).toEqual(1);
            expect(tapRoomService.deleteTap.calls.count()).toEqual(0);
        });

        it('Throws an error for an invalid response', function() {
            spyOn(tapRoomService, 'deleteTap').and.returnValue(q.resolve({
                error: true
            }));

            initDirective();
            timeout.flush();

            mockScope.deleteTap(1);
            timeout.flush();

            expect($window.confirm.calls.count()).toEqual(1);
            expect(tapRoomService.deleteTap.calls.count()).toEqual(1);
            expect($window.alert.calls.count()).toEqual(1);
        });

        it('handles a successful call correctly', function() {
            spyOn(tapRoomService, 'deleteTap').and.returnValue(q.resolve({
                error: false
            }));

            initDirective();
            timeout.flush();
            expect(tapRoomService.getUserEntries.calls.count()).toEqual(1);

            mockScope.deleteTap(1);
            mockScope.$apply();
            timeout.flush();

            expect($window.confirm.calls.count()).toEqual(1);
            expect(tapRoomService.deleteTap.calls.count()).toEqual(1);
            expect(mockScope.formError).toEqual(false);
            expect($window.alert.calls.count()).toEqual(0);

            expect(tapRoomService.getUserEntries.calls.count()).toEqual(2);
        });
    });
});
