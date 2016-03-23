describe('Service: UserService', function() {
    'use strict';

    beforeEach(module('brewbear-services', 'brewbear-templates'));
    beforeEach(inject(function(UserService, $http, $httpBackend,
        $timeout) {
        this.factory = UserService;
        this.$http = $http;
        this.$httpBackend = $httpBackend;
        this.$timeout = $timeout;
    }));

    describe('getUser function - ', function() {
        afterEach(function() {
            this.$httpBackend.verifyNoOutstandingExpectation();
            this.$httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            this.$httpBackend.whenGET('/users').respond(500, '');
            this.factory.getUser().then(function(result) {
                expect(result).toEqual({
                    error: true
                });
            });
            this.$httpBackend.flush();
            this.$timeout.flush();
        });

        it('Returns null from the api', function() {
            this.$httpBackend.whenGET('/users').respond(200, null);

            this.factory.getUser().then(function(result) {
                expect(result).toEqual(null);
            });
            this.$httpBackend.flush();
            this.$timeout.flush();
        });

        it('Returns an invalid response from the api', function() {
            this.$httpBackend.whenGET('/users').respond(200, {
                error: true,
                message: ''
            });

            this.factory.getUser().then(function(result) {
                expect(result).toEqual({
                    error: true,
                    message: ''
                });
            });
            this.$httpBackend.flush();
            this.$timeout.flush();
        });

        it('Returns a succesful response', function() {
            this.$httpBackend.whenGET('/users').respond(200, {
                user: {
                    id: 1,
                    name: 'John Jingleheimer',
                    email: 'smith@dot.com'
                }
            });
            this.factory.getUser().then(function(result) {
                expect(result.user).toEqual({
                    id: 1,
                    name: 'John Jingleheimer',
                    email: 'smith@dot.com'
                });
            });
            this.$httpBackend.flush();
        });
    });

    describe('update function - ', function() {
        afterEach(function() {
            this.$httpBackend.verifyNoOutstandingExpectation();
            this.$httpBackend.verifyNoOutstandingRequest();
        });

        it('Returns a 500 error', function() {
            this.$httpBackend.whenPOST('/users/edit/1').respond(500, '');
            this.factory.updateUser({
                id: 1
            }).then(function(result) {
                expect(result).toEqual({
                    error: true
                });
            });
            this.$httpBackend.flush();
            this.$timeout.flush();
        });

        it('succeeds but the response is null', function() {
            this.$httpBackend.whenPOST('/users/edit/1').respond(200, null);
            this.factory.updateUser({
                id: 1
            }).then(function(result) {
                expect(result).toEqual(null);
            });
            this.$httpBackend.flush();
            this.$timeout.flush();
        });

        it('succeeds and handles an error message from the server', function() {
            this.$httpBackend.whenPOST('/users/edit/1')
                .respond(200, {
                    error: true,
                    msg: 'blah'
                });
            this.factory.updateUser({
                id: 1
            }).then(function(result) {
                expect(result.error).toEqual(true);
            });
            this.$httpBackend.flush();
            this.$timeout.flush();
        });

        it('succeeds completely', function() {
            this.$httpBackend.whenPOST('/users/edit/1').respond(200, {
                id: 1,
                test: true
            });
            this.factory.updateUser({
                id: 1
            }).then(function(result) {
                expect(result).toEqual({
                    id: 1,
                    test: true
                });
            });
            this.$httpBackend.flush();
            this.$timeout.flush();
        });
    });
});
