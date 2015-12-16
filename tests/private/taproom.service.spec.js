describe('Service: TapRoomService', function() {
    'use strict';

    var factory, http, httpBackend, timeout;
    beforeEach(module('brewbear-services', 'brewbear-templates'));

    beforeEach(inject(function(_TapRoomService_, $http, $httpBackend,
        $timeout) {
        factory = _TapRoomService_;
        http = $http;
        httpBackend = $httpBackend;
        timeout = $timeout;
    }));

    describe('create function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/new').respond(500, '');
            factory.create().then(function(result) {
                expect(result).toEqual({error: true});
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, null);

            factory.create().then(function(result) {
                expect(result).toEqual(
                    {error: true, id: -1, message: 'Error creating taproom entry'}
                );
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/new').respond(200,
                {error: true, message: ''});

            factory.create().then(function(result) {
                expect(result).toEqual(
                    {error: true, id: -1, message: 'Error creating taproom entry'}
                );
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, {id: 1});
            factory.create().then(function(result) {
                expect(result).toBeDefined();
                expect(result).toEqual({error: false, id: 1});
            });
            httpBackend.flush();
        });
    });
});
