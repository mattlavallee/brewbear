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

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    function asyncServiceCallValidation(fnName, params, expectedValue) {
        factory[fnName](params).then(function(result) {
            expect(result).toEqual(expectedValue);
        });
        httpBackend.flush();
        timeout.flush();
    }

    describe('getUserEntries function - ', function() {
        it('Returns a 500 error', function() {
            httpBackend.whenGET('/taproom/user').respond(500, '');
            asyncServiceCallValidation('getUserEntries', [], []);
        });

        it('Returns null from the api', function() {
            httpBackend.whenGET('/taproom/user').respond(200, null);
            asyncServiceCallValidation('getUserEntries', [], []);
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenGET('/taproom/user').respond(200, {
                error: true,
                message: ''
            });
            asyncServiceCallValidation('getUserEntries', [], []);
        });

        it('returns a successful response', function() {
            httpBackend.whenGET('/taproom/user').respond(200, {
                data: [{}, {}]
            });
            asyncServiceCallValidation('getUserEntries', [], [{}, {}]);
        });
    });

    describe('create function - ', function() {
        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/new').respond(500, '');
            asyncServiceCallValidation('create', [], {
                error: true
            });
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, null);
            asyncServiceCallValidation('create', [], {
                error: true,
                id: -1,
                message: 'Error creating taproom entry'
            });
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, {
                error: true,
                message: ''
            });
            asyncServiceCallValidation('create', [], {
                error: true,
                id: -1,
                message: 'Error creating taproom entry'
            });
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/new').respond(200, {
                id: 1
            });
            asyncServiceCallValidation('create', [], {
                error: false,
                id: 1
            });
        });
    });

    describe('kicked tap function - ', function() {
        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(500, '');
            asyncServiceCallValidation('kickTap', [1], {
                error: true
            });
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(200, null);
            asyncServiceCallValidation('kickTap', [1], {
                error: true,
                id: -1,
                message: 'Error kicking taproom entry'
            });
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(200, {
                error: true,
                message: ''
            });
            asyncServiceCallValidation('kickTap', [1], {
                error: true,
                id: -1,
                message: 'Error kicking taproom entry'
            });
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/kickTap').respond(200, {
                id: 1
            });
            asyncServiceCallValidation('kickTap', [1], {
                error: false,
                id: 1
            });
        });
    });

    describe('delete tap function - ', function() {
        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(500, '');
            asyncServiceCallValidation('deleteTap', [1], {
                error: true
            });
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(200, null);
            asyncServiceCallValidation('deleteTap', [1], {
                error: true,
                id: -1,
                message: 'Error deleting taproom entry'
            });
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(200, {
                error: true,
                message: ''
            });
            asyncServiceCallValidation('deleteTap', [1], {
                error: true,
                id: -1,
                message: 'Error deleting taproom entry'
            });
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/deleteTap').respond(200, {
                id: 1
            });
            asyncServiceCallValidation('deleteTap', [1], {
                error: false,
                id: 1
            });
        });
    });

    describe('pour drink function - ', function() {
        it('Returns a 500 error', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(500, '');
            asyncServiceCallValidation('pourDrink', [1, 2], {
                error: true
            });
        });

        it('Returns null from the api', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(200, null);
            asyncServiceCallValidation('pourDrink', [1, 2], {
                error: true,
                id: -1,
                message: 'Error pouring taproom entry'
            });
        });

        it('Returns an invalid response from the api', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(200, {
                error: true,
                message: ''
            });
            asyncServiceCallValidation('pourDrink', [1, 2], {
                error: true,
                id: -1,
                message: 'Error pouring taproom entry'
            });
        });

        it('Returns a succesful response', function() {
            httpBackend.whenPOST('/taproom/pourDrink').respond(200, {
                id: 1
            });
            asyncServiceCallValidation('pourDrink', [1, 2], {
                error: false,
                id: 1
            });
        });
    });
});
