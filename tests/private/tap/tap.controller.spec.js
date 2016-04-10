describe('Controller: Tap Controller', function() {
    'use strict';

    var tapService, q, timeout, defer, location;
    var initController;

    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates', 'brewbear-common'));

    beforeEach(inject(function(_TapService_, $controller, $q, $timeout,
        $location) {
        tapService = _TapService_;
        q = $q;
        timeout = $timeout;
        location = $location;

        initController = function() {
            return $controller('TapController', {
                TapService: tapService
            }, true);
        };

        defer = q.defer();
        spyOn(tapService, 'getUserTaps').and.callFake(function() {
            defer.resolve([{
                id: 1,
                typeId: 2,
                name: 'monkey'
            }]);
            return defer.promise;
        });
    }));

    describe('controller initialization - ', function() {
        it('Tests instantiation', function() {
            var controllerFn = initController();
            var controller = controllerFn();
            expect(controller).toBeDefined();
            expect(controller.taps).toBeDefined();
            expect(controller.types).toBeDefined();
            expect(controller.types.length).toEqual(2);
            expect(controller.id).not.toBeDefined();
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

    describe('add/update tap initialization - ', function() {
        it('initializes for an add - ', function() {
            var controllerFn = initController();
            controllerFn.instance.id = -1;
            var controller = controllerFn();

            expect(controller.id).toEqual(-1);
            expect(tapService.getUserTaps.calls.count()).toEqual(0);
        });

        it('initializes for an update - ', function() {
            var controllerFn = initController();
            controllerFn.instance.id = 1;
            var controller = controllerFn();

            defer.promise.then(function() {
                expect(controller.model.name).toEqual('monkey');
                expect(controller.model.typeId).toEqual('2');
                expect(tapService.getUserTaps.calls.count()).toEqual(1);
                expect(controller.notFoundError).toEqual(false);
            });
            timeout.flush();

            expect(controller.id).toEqual(1);
        });

        it('initializes for an update but doesn\'t find the tap', function() {
            var controllerFn = initController();
            controllerFn.instance.id = 100;
            var controller = controllerFn();

            defer.promise.then(function() {
                expect(controller.model.name).toEqual('');
                expect(controller.model.typeId).toEqual('');
                expect(tapService.getUserTaps.calls.count()).toEqual(1);
                expect(controller.notFoundError).toEqual(true);
            });
            timeout.flush();

            expect(controller.id).toEqual(100);
        });
    });

    describe('saving a tap - ', function() {
        beforeEach(function() {
            spyOn(location, 'path');
        });

        it('errors out - ', function() {
            var controllerFn = initController();
            controllerFn.instance.id = -1;
            var controller = controllerFn();

            controller.saveTap(false);

            expect(controller.error).toEqual(true);
        });

        it('makes the call to save a new tap', function() {
            spyOn(tapService, 'create').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({
                    id: 1
                });
                return defer.promise;
            });
            var controllerFn = initController();
            controllerFn.instance.id = -1;
            var controller = controllerFn();

            controller.saveTap(true);
            timeout.flush();

            expect(tapService.create.calls.count()).toEqual(1);
            expect(location.path.calls.count()).toEqual(1);
            expect(location.path).toHaveBeenCalledWith('/');
            expect(controller.error).toEqual(false);
        });

        it('sets the error condition if create fails', function() {
            spyOn(tapService, 'create').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({
                    error: true
                });
                return defer.promise;
            });
            var controllerFn = initController();
            controllerFn.instance.id = -1;
            var controller = controllerFn();

            controller.saveTap(true);
            timeout.flush();

            expect(tapService.create.calls.count()).toEqual(1);
            expect(location.path.calls.count()).toEqual(0);
            expect(controller.error).toEqual(true);
        });

        it('makes the call to update a tap', function() {
            spyOn(tapService, 'update').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({
                    id: 1
                });
                return defer.promise;
            });
            var controllerFn = initController();
            controllerFn.instance.id = 1;
            var controller = controllerFn();

            controller.saveTap(true);
            timeout.flush();

            expect(tapService.update.calls.count()).toEqual(1);
            expect(location.path.calls.count()).toEqual(1);
            expect(location.path).toHaveBeenCalledWith('/');
            expect(controller.error).toEqual(false);
        });

        it('sets the error condition if update fails', function() {
            spyOn(tapService, 'update').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({
                    error: true
                });
                return defer.promise;
            });
            var controllerFn = initController();
            controllerFn.instance.id = 1;
            var controller = controllerFn();

            controller.saveTap(true);
            timeout.flush();

            expect(tapService.update.calls.count()).toEqual(1);
            expect(location.path.calls.count()).toEqual(0);
            expect(controller.error).toEqual(true);
        });
    });

    describe('edit tap - ', function() {
        it('goes to the correct url', function() {
            spyOn(location, 'path');
            var controller = initController()();
            controller.editTap(1);

            expect(location.path).toHaveBeenCalledWith('/editTap/1');
        });
    });

    describe('cancel tap - ', function() {
        it('goes to the correct url', function() {
            spyOn(location, 'path');
            var controller = initController()();
            controller.cancelTap();

            expect(location.path).toHaveBeenCalledWith('/');
        });
    });
});
