describe( 'Controller: Beer Controller', function () {
    'use strict';

    var beerService, q, timeout;
    var initController;

    beforeEach( module( 'brewbear-component', 'brewbear-services', 
        'brewbear-templates' ) );

    beforeEach( inject( function( _BeerService_, $controller, $q, $timeout ){
        beerService = _BeerService_;
        q = $q;
        timeout = $timeout;

        initController = function() {
            return $controller( 'BeerController', {
                BeerService: beerService
            } );
        };
    } ) );

    describe( 'controller initialization - ', function() {
        it( 'Tests instantiation', function() {
            var controller = initController();
            expect( controller ).toBeDefined();
            expect( controller.beers ).toBeDefined();
        } );

        it( 'Initializes the controller', function() {
            var defer = q.defer();
            spyOn( beerService, 'getUserBeers' ).and.callFake(function(){
                defer.resolve( [ {} ] );
                return defer.promise;
            } );

            var controller = initController();

            defer.promise.then( function() {
                expect( controller.beers ).toBeDefined();
            } );
            timeout.flush();

            expect( beerService.getUserBeers.calls.count() ).toEqual( 1 );
        } );
    } );
} );
