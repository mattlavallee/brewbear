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

    describe('getUserEntries function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenGET('/taproom/user').respond(500, '');
            factory.getUserEntries().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenGET('/taproom/user').respond(200, null);

            factory.getUserEntries().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenGET('/taproom/user').respond(200, {
                error: true,
                message: ''
            });

            factory.getUserEntries().then(function(result) {
                expect(result).toEqual([]);
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('returns a successful response', function() {
            httpBackend.whenGET('/taproom/user').respond(200, {
                data: [{}, {}]
            });

            factory.getUserEntries().then(function(result) {
                expect(result).toBeDefined();
                expect(result.length).toEqual(2);
            });
            httpBackend.flush();
            timeout.flush();
        });
    });

    describe('create function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/new').respond(500, '');
            factory.create().then(function(result) {
                expect(result).toEqual({
                    error: true
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, null);

            factory.create().then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error creating taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, {
                error: true,
                message: ''
            });

            factory.create().then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error creating taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, {
                id: 1
            });
            factory.create().then(function(result) {
                expect(result).toBeDefined();
                expect(result).toEqual({
                    error: false,
                    id: 1
                });
            });
            httpBackend.flush();
            timeout.flush();
        });
    });

    describe('kicked tap function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(500, '');
            factory.kickTap(1).then(function(result) {
                expect(result).toEqual({
                    error: true
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(200, null);

            factory.kickTap(1).then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error kicking taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(200, {
                error: true,
                message: ''
            });

            factory.kickTap(1).then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error kicking taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(200, {
                id: 1
            });
            factory.kickTap(1).then(function(result) {
                expect(result).toBeDefined();
                expect(result).toEqual({
                    error: false,
                    id: 1
                });
            });
            httpBackend.flush();
            timeout.flush();
        });
    });

    describe('delete tap function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(500, '');
            factory.deleteTap(1).then(function(result) {
                expect(result).toEqual({
                    error: true
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(200, null);

            factory.deleteTap(1).then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error deleting taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(200, {
                error: true,
                message: ''
            });

            factory.deleteTap(1).then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error deleting taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(200, {
                id: 1
            });
            factory.deleteTap(1).then(function(result) {
                expect(result).toBeDefined();
                expect(result).toEqual({
                    error: false,
                    id: 1
                });
            });
            httpBackend.flush();
            timeout.flush();
        });
    });

    describe('pour drink function - ', function() {
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(500, '');
            factory.pourDrink(1, 2).then(function(result) {
                expect(result).toEqual({
                    error: true
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(200, null);

            factory.pourDrink(1, 2).then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error pouring taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(200, {
                error: true,
                message: ''
            });

            factory.pourDrink(1, 2).then(function(result) {
                expect(result).toEqual({
                    error: true,
                    id: -1,
                    message: 'Error pouring taproom entry'
                });
            });
            httpBackend.flush();
            timeout.flush();
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(200, {
                id: 1
            });
            factory.pourDrink(1, 2).then(function(result) {
                expect(result).toBeDefined();
                expect(result).toEqual({
                    error: false,
                    id: 1
                });
            });
            httpBackend.flush();
            timeout.flush();
        });
    });
});
