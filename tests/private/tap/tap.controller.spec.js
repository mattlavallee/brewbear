describe('Controller: Tap Controller', function() {
    'use strict';

    var tapService, q, timeout, defer;
    var initController;

    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates', 'brewbear-common'));

    beforeEach(inject(function(_TapService_, $controller, $q, $timeout) {
        tapService = _TapService_;
        q = $q;
        timeout = $timeout;

        initController = function() {
            return $controller('TapController', {
                TapService: tapService
            }, true);
        };

        defer = q.defer();
        spyOn(tapService, 'getUserTaps').and.callFake(function() {
            defer.resolve([{ id: 1 }]);
            return defer.promise;
        });
    }));

    describe('controller initialization - ', function() {
        it('Tests instantiation', function() {
            var controllerFn = initController();
            var controller = controllerFn();
            expect(controller).toBeDefined();
            expect(controller.taps).toBeDefined();
        });

        it('Initializes the controller', function() {
            var controllerFn = initController();
            var controller = controllerFn();

            defer.promise.then(function() {
                expect(controller.taps).toBeDefined();
            });
            timeout.flush();

            expect(tapService.getUserTaps.calls.count()).toEqual(1);
        });
    });
});
