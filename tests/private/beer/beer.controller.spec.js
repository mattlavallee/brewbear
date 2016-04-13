describe('Controller: Beer Controller', function() {
    'use strict';

    var beerService, q, timeout, defer, rootScope;
    var initController, SRM;

    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates', 'brewbear-common'));

    beforeEach(inject(function(_BeerService_, _SRM_, $controller, $q,
        $timeout, $rootScope) {
        beerService = _BeerService_;
        SRM = _SRM_;
        q = $q;
        timeout = $timeout;
        rootScope = $rootScope;

        initController = function() {
            return $controller('BeerController', {
                BeerService: beerService
            }, true);
        };

        defer = q.defer();
        spyOn(beerService, 'getUserBeers').and.callFake(function() {
            defer.resolve([{
                id: 1
            }]);
            return defer.promise;
        });
    }));

    describe('controller initialization - ', function() {
        it('Tests instantiation', function() {
            var controllerFn = initController();
            controllerFn.instance.id = undefined;
            var controller = controllerFn();
            expect(controller).toBeDefined();
            expect(controller.beers).toBeDefined();
        });

        it('Initializes the controller', function() {
            var controllerFn = initController();
            controllerFn.instance.id = undefined;
            var controller = controllerFn();

            defer.promise.then(function() {
                expect(controller.beers).toBeDefined();
            });
            timeout.flush();

            expect(beerService.getUserBeers.calls.count()).toEqual(1);
        });

        it('Makes no initial service calls for a new beer', function() {
            var controllerFn = initController();
            controllerFn.instance.id = -1;
            var controller = controllerFn();
            expect(controller).toBeDefined();
            expect(controller.id).toEqual(-1);
            expect(beerService.getUserBeers.calls.count()).toEqual(0);
        });

        it('Makes a service call to get the beer to edit', function() {
            var controllerFn = initController();
            controllerFn.instance.id = 1;
            var controller = controllerFn();

            defer.promise.then(function() {
                expect(controller.model.id).toEqual(1);
            });
            timeout.flush();

            expect(controller.id).toEqual(1);
            expect(beerService.getUserBeers.calls.count()).toEqual(1);
        });

        it('Makes service call to edit but does not find the beer', function() {
            var controllerFn = initController();
            controllerFn.instance.id = 2;
            var controller = controllerFn();

            defer.promise.then(function() {
                expect(controller.notFoundError).toEqual(true);
            });
            timeout.flush();

            expect(controller.id).toEqual(2);
            expect(beerService.getUserBeers.calls.count()).toEqual(1);
        });
    });

    describe('getSrmColor - ', function() {
        it('is defined', function() {
            var controller = initController()();
            expect(controller.getSrmColor).toBeDefined();
        });

        it('gets a color', function() {
            var controller = initController()();
            var result = controller.getSrmColor(3);
            expect(result).toEqual(SRM.Straw.color);

            result = controller.getSrmColor(50);
            expect(result).toEqual(SRM.Black.color);

            result = controller.getSrmColor(0);
            expect(result).toEqual(SRM.PaleStraw.color);
        });
    });

    describe('saveBeer - new beer - ', function() {
        it('is defined', function() {
            var controller = initController()();
            expect(controller.saveBeer).toBeDefined();
        });

        it('returns an error if not valid', function() {
            var controller = initController()();
            controller.id = -1;
            expect(controller.error).toEqual(false);

            controller.saveBeer(false);

            expect(controller.error).toEqual(true);
        });

        it('calls the BeerService for a valid model', function() {
            spyOn(beerService, 'create').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({});
                return defer.promise;
            });
            spyOn(rootScope, '$emit');

            var controller = initController()();
            spyOn(controller, 'resetActiveBeerModel').and.callThrough();
            spyOn(controller, 'closeBeerDialog').and.callThrough();

            controller.id = -1;
            var promise = controller.saveBeer(true);

            expect(beerService.create.calls.count()).toEqual(1);
            timeout.flush();
            promise.then(function() {
                expect(controller.resetActiveBeerModel.calls.count())
                    .toEqual(1);
                expect(controller.closeBeerDialog.calls.count()).toEqual(1);
                expect(rootScope.$emit).toHaveBeenCalledWith('refetch-beers');
            });
        });

        it('handles an error when creating a beer', function() {
            spyOn(beerService, 'create').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({
                    error: true
                });
                return defer.promise;
            });
            spyOn(rootScope, '$emit');

            var controller = initController()();
            controller.id = -1;
            var promise = controller.saveBeer(true);

            expect(beerService.create.calls.count()).toEqual(1);
            timeout.flush();
            promise.then(function() {
                expect(rootScope.$emit).not.toHaveBeenCalled();
                expect(controller.error).toEqual(true);
            });
        });
    });

    describe('save beer - edit - ', function() {
        it('calls the BeerService for a valid model', function() {
            spyOn(beerService, 'update').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({});
                return defer.promise;
            });
            spyOn(rootScope, '$emit');

            var controller = initController()();
            spyOn(controller, 'resetActiveBeerModel').and.callThrough();
            spyOn(controller, 'closeBeerDialog').and.callThrough();
            controller.id = 1;
            var promise = controller.saveBeer(true);

            expect(beerService.update.calls.count()).toEqual(1);
            timeout.flush();
            promise.then(function() {
                expect(controller.resetActiveBeerModel.calls.count())
                    .toEqual(1);
                expect(controller.closeBeerDialog.calls.count()).toEqual(1);
                expect(rootScope.$emit).toHaveBeenCalledWith('refetch-beers');
            });
        });

        it('handles an error when creating a beer', function() {
            spyOn(beerService, 'update').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({
                    error: true
                });
                return defer.promise;
            });
            spyOn(rootScope, '$emit');

            var controller = initController()();
            controller.id = 1;
            var promise = controller.saveBeer(true);

            expect(beerService.update.calls.count()).toEqual(1);
            timeout.flush();
            promise.then(function() {
                expect(rootScope.$emit).not.toHaveBeenCalled();
                expect(controller.error).toEqual(true);
            });
        });
    });

    describe('remove beer - ', function() {
        it('does nothing if the beer cannot be found', function() {
            spyOn(beerService, 'remove').and.callFake(function() {
                return q.resolve({
                    error: true
                });
            });

            var controller = initController()();
            timeout.flush();

            expect(controller.beers.length).toEqual(1);
            controller.deleteBeer(-1);
            timeout.flush();
            expect(controller.beers.length).toEqual(1);
        });

        it('removes the beer if the service call succeeds', function() {
            spyOn(beerService, 'remove').and.callFake(function() {
                return q.resolve({
                    error: false
                });
            });

            var controller = initController()();
            timeout.flush();

            expect(controller.beers.length).toEqual(1);
            controller.deleteBeer(1);
            timeout.flush();
            expect(controller.beers.length).toEqual(0);
        });
    });

    describe('update active beer id', function() {
        it('updates properly', function() {
            var controller = initController()();
            expect(controller.activeBeerId).toEqual(-1);
            controller.updateActiveBeerId(22);
            expect(controller.activeBeerId).toEqual(22);
        });
    });
});
