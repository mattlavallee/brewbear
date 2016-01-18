describe('Directive: Taproom', function() {
    'use strict';

    var mockScope, element, compile, tapRoomService, unitMathService,
        q, timeout, $window;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $q, $timeout,
        _TapRoomService_, _$window_, _UnitMathService_) {
        mockScope = $rootScope.$new();
        compile = $compile;
        q = $q;
        timeout = $timeout;
        $window = _$window_;

        tapRoomService = _TapRoomService_;
        unitMathService = _UnitMathService_;

        spyOn(tapRoomService, 'getUserEntries').and.callFake(function() {
            return q.resolve([{
                barId: 1,
                volume: 5,
                drinks: [],
                tap: {
                    id: 1
                }
            }]);
        });
        spyOn(tapRoomService, 'pourDrink').and.callFake(function() {
            return q.resolve({});
        });
    }));

    function initDirective() {
        var html = '<taproom class="taproom-directive"></taproom>';
        element = compile(html)(mockScope);
        mockScope.$apply();
    }

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            initDirective();
            timeout.flush();

            expect(element).toBeDefined();
            expect(element.hasClass('taproom-directive')).toEqual(true);

            expect(tapRoomService.getUserEntries.calls.count()).toEqual(1);
            expect(mockScope.taproomEntries.length).toEqual(1);
        });
    });

    describe('cancel a pour - ', function() {
        it('Properly cleans up when cancelling a pour', function() {
            initDirective();
            timeout.flush();

            mockScope.activeTaproomEntry = {
                id: 1
            };
            mockScope.cancelPour();

            expect(mockScope.activeTaproomEntry).toEqual({});
        });
    });

    describe('setTap for prep to pour a drink - ', function() {
        it('Properly sets state for pouring a drink', function() {
            spyOn(unitMathService, 'getValidUnits').and.returnValue([1, 2, 3]);
            spyOn(unitMathService, 'getMaxVolume').and.returnValue(100);

            initDirective();
            timeout.flush();
            mockScope.setTap(42, 24, 5);

            expect(mockScope.activeTaproomEntry).toEqual({
                taproomId: 42,
                originalUnits: 24,
                originalVolume: 5,
                currentVolume: 0,
                currentUnits: '24',
                validUnits: [1, 2, 3],
                maxVolume: 100
            });

            expect(unitMathService.getValidUnits.calls.count()).toEqual(1);
            expect(unitMathService.getValidUnits).toHaveBeenCalledWith(24);

            expect(unitMathService.getMaxVolume.calls.count()).toEqual(1);
            expect(unitMathService.getMaxVolume)
                .toHaveBeenCalledWith(24, 5, 24);
        });
    });

    describe('zeroOutVolume - ', function() {
        it('properly updates state when zeroing out the volume', function() {
            spyOn(unitMathService, 'getMaxVolume').and.returnValue(42);
            initDirective();
            timeout.flush();

            mockScope.activeTaproomEntry.originalUnits = 4;
            mockScope.activeTaproomEntry.originalVolume = 40;
            mockScope.activeTaproomEntry.currentUnits = 2;

            mockScope.zeroOutVolume();

            expect(mockScope.activeTaproomEntry.currentVolume).toEqual(0);
            expect(mockScope.activeTaproomEntry.maxVolume).toEqual(42);

            expect(unitMathService.getMaxVolume.calls.count()).toEqual(1);
            expect(unitMathService.getMaxVolume).toHaveBeenCalledWith(4, 40, 2);
        });
    });

    describe('pourMyDrink - ', function() {
        it('does nothing for invalid values', function() {
            initDirective();
            timeout.flush();

            mockScope.activeTaproomEntry.currentVolume = 0;
            mockScope.activeTaproomEntry.currentUnits = 10;

            mockScope.pourMyDrink();
            expect(tapRoomService.pourDrink.calls.count()).toEqual(0);

            mockScope.activeTaproomEntry.currentVolume = 2;
            mockScope.activeTaproomEntry.currentUnits = 'sheep';

            mockScope.pourMyDrink();
            expect(tapRoomService.pourDrink.calls.count()).toEqual(0);
        });

        it('properly pours a drink!', function() {
            spyOn(unitMathService, 'convertVolumeToOriginalUnits')
                .and.returnValue(5);

            initDirective();
            timeout.flush();

            mockScope.activeTaproomEntry.originalUnits = 5;
            mockScope.activeTaproomEntry.currentVolume = 10;
            mockScope.activeTaproomEntry.currentUnits = 2;
            mockScope.activeTaproomEntry.taproomId = 1;

            mockScope.pourMyDrink();
            timeout.flush();

            expect(unitMathService.convertVolumeToOriginalUnits.calls.count())
                .toEqual(1);
            expect(unitMathService.convertVolumeToOriginalUnits)
                .toHaveBeenCalledWith(5, 2, 10);
            expect(tapRoomService.pourDrink.calls.count()).toEqual(1);
            expect(tapRoomService.pourDrink).toHaveBeenCalledWith(1, 5);
        });
    });
});
