describe( 'Service: BeerService', function () {
    'use strict';

    var factory, http, httpBackend, timeout;

    beforeEach( module( 'brewbear-services', 'brewbear-templates' ) );

    beforeEach( inject( function( _BeerService_, $http, $httpBackend, 
        $timeout ){
        factory = _BeerService_;
        http = $http;
        httpBackend = $httpBackend;
        timeout = $timeout;
    } ) );

    describe( 'getUserBeers function - ', function() {
        afterEach( function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        } );

        it( 'Returns a 500 error', function() {
            httpBackend.whenGET( '/beer/user' ).respond( 500, '' );
            factory.getUserBeers().then( function( result ) {
                expect( result ).toEqual( [] );
            } );
            httpBackend.flush();
            timeout.flush();
        } );

        it( 'Returns null from the api', function() {
            httpBackend.whenGET( '/beer/user' ).respond( 200, null );

            factory.getUserBeers().then( function( result ) {
                expect( result ).toEqual( [] );
            } );
            httpBackend.flush();
            timeout.flush();
        } );

        it( 'Returns an invalid response from the api', function() {
            httpBackend.whenGET( '/beer/user' ).respond( 200, 
                { error: true, message: '' } );

            factory.getUserBeers().then( function( result ) {
                expect( result ).toEqual( [] );
            } );
            httpBackend.flush();
            timeout.flush();
        } );

        it( 'Returns an error code from the api', function() {
            httpBackend.whenGET( '/beer/user' ).respond( 200, { data: [
                { name: 'Fizz' },
                { name: 'Fuzz' } ] } );
            factory.getUserBeers().then( function( result ) {
                expect( result.length ).toEqual( 2 );
                expect( result[0].name ).toEqual( 'Fizz' );
                expect( result[1].name ).toEqual( 'Fuzz' );
            } );
            httpBackend.flush();
        } );

        it( 'Returns a succesful response', function() {

        } );
    } );
} );
