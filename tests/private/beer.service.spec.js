describe('Service: BeerService', function() {
    'use strict';

    var factory, http, httpBackend, timeout;
    beforeEach(module('brewbear-services', 'brewbear-templates'));

    beforeEach(inject(function(_BeerService_, $http, $httpBackend,
        $timeout) {
        factory = _BeerService_;
        http = $http;
        httpBackend = $httpBackend;
        timeout = $timeout;
    }));

    describe('getUserBeers function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenGET('/beer/user').respond(500, '');
            factory.getUserBeers().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenGET('/beer/user').respond(200, null);

            factory.getUserBeers().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenGET('/beer/user').respond(200,
                {error: true, message: ''});

            factory.getUserBeers().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns a succesful response', function() {
            httpBackend.whenGET('/beer/user').respond(200, {data: [
                {name: 'Fizz'},
                {name: 'Fuzz'}]});
            factory.getUserBeers().then(function(result) {
                expect(result.length).toEqual(2);
                expect(result[0].name).toEqual('Fizz');
                expect(result[1].name).toEqual('Fuzz');
            });
            httpBackend.flush();
        });
    });

    describe('create function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/beer/new').respond(500, '');
            factory.create().then(function(result) {
                expect(result).toEqual({error:true});
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('succeeds but the response is null', function() {
            httpBackend.whenPOST('/beer/new').respond(200, null);
            factory.create().then(function(result) {
                expect(result.error).toEqual(true);
                expect(result.message).toEqual('Error creating beer');
                expect(result.id).toEqual(-1);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('succeeds and handles an error message from the server', function() {
            httpBackend.whenPOST('/beer/new')
                .respond(200, { error: true, msg: 'blah' });
            factory.create().then(function(result) {
                expect(result.error).toEqual(true);
                expect(result.message).toEqual('blah');
                expect(result.id).toEqual(-1);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('succeeds completely', function() {
            httpBackend.whenPOST('/beer/new').respond(200, {id: 123});
            factory.create().then(function(result) {
                expect(result.error).toEqual(false);
                expect(result.id).toEqual(123);
            });
            httpBackend.flush();
            timeout.flush();
        });
    });
});
