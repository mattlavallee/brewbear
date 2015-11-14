describe('Service: TapService', function() {
    'use strict';

    var factory, http, httpBackend, timeout;
    beforeEach(module('brewbear-services', 'brewbear-templates'));

    beforeEach(inject(function(_TapService_, $http, $httpBackend,
        $timeout) {
        factory = _TapService_;
        http = $http;
        httpBackend = $httpBackend;
        timeout = $timeout;
    }));

    describe('getUserTaps function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenGET('/tap/user').respond(500, '');
            factory.getUserTaps().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenGET('/tap/user').respond(200, null);

            factory.getUserTaps().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenGET('/tap/user').respond(200,
                {error: true, message: ''});

            factory.getUserTaps().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns a succesful response', function() {
            httpBackend.whenGET('/tap/user').respond(200, {data: [
                {name: 'Fred'}, {name: 'Daphne'}, {name: 'Velma'}]});
            factory.getUserTaps().then(function(result) {
                expect(result.length).toEqual(3);
                expect(result[0].name).toEqual('Fred');
                expect(result[1].name).toEqual('Daphne');
                expect(result[2].name).toEqual('Velma');
            });
            httpBackend.flush();
        });
    });
});
