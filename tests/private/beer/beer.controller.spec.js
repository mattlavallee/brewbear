describe('Controller: Beer Controller', function() {
    'use strict';

    var beerService, q, timeout, defer;
    var initController, SRM;

    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates', 'brewbear-common'));

    beforeEach(inject(function(_BeerService_, _SRM_, $controller, $q,
        $timeout) {
        beerService = _BeerService_;
        SRM = _SRM_;
        q = $q;
        timeout = $timeout;

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
});
