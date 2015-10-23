describe('Controller: Beer Controller', function() {
    'use strict';

    var beerService, q, timeout, defer, location;
    var initController, SRM;

    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates', 'brewbear-common'));

    beforeEach(inject(function(_BeerService_, _SRM_, $controller, $q,
        $timeout, $location) {
        beerService = _BeerService_;
        SRM = _SRM_;
        q = $q;
        timeout = $timeout;
        location = $location;

        initController = function() {
            return $controller('BeerController', {
                BeerService: beerService
            }, true);
        };

        defer = q.defer();
        spyOn(beerService, 'getUserBeers').and.callFake(function() {
            defer.resolve([{}]);
            return defer.promise;
        });
    }));

    describe('controller initialization - ', function() {
        it('Tests instantiation', function() {
            var controllerFn = initController();
            controllerFn.instance.isNew = 'false';
            var controller = controllerFn();
            expect(controller).toBeDefined();
            expect(controller.beers).toBeDefined();
        });

        it('Initializes the controller', function() {
            var controllerFn = initController();
            controllerFn.instance.isNew = 'false';
            var controller = controllerFn();

            defer.promise.then(function() {
                expect(controller.beers).toBeDefined();
            });
            timeout.flush();

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

    describe('createBeer - ', function() {
        it('is defined', function() {
            var controller = initController()();
            expect(controller.createBeer).toBeDefined();
        });

        it('returns an error if not valid', function() {
            var controller = initController()();
            expect(controller.error).toEqual(false);

            controller.createBeer(false);

            expect(controller.error).toEqual(true);
        });

        it('calls the BeerService for a valid model', function() {
            spyOn(beerService, 'create').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({data: {} });
                return defer.promise;
            });
            spyOn(location, 'path');

            var controller = initController()();
            var promise = controller.createBeer(true);

            expect(beerService.create.calls.count()).toEqual(1);
            timeout.flush();
            promise.then(function() {
                expect(location.path.calls.count()).toEqual(1);
            });
        });

        it('handles an error when creating a beer', function() {
            spyOn(beerService, 'create').and.callFake(function() {
                var defer = q.defer();
                defer.resolve({data:{error: true}});
                return defer.promise;
            });
            spyOn(location, 'path');

            var controller = initController()();
            var promise = controller.createBeer(true);

            expect(beerService.create.calls.count()).toEqual(1);
            timeout.flush();
            promise.then(function() {
                expect(location.path.calls.count()).toEqual(0);
                expect(controller.error).toEqual(true);
            });
        });
    });
});
