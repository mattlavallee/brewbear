describe('Directive: User Directive', function() {
    'use strict';

    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $httpBackend,
        UserService, $q, $timeout) {
        this.mockScope = $rootScope.$new();
        this.$httpBackend = $httpBackend;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.$q = $q;
        this.UserService = UserService;

        var vm = this;
        spyOn(this.UserService, 'getUser').and.callFake(function() {
            return vm.$q.resolve({
                user: {
                    id: 1,
                    name: 'Test',
                    email: 'test@dot.com'
                }
            });
        });

        this.initDirective = function() {
            this.element = this.$compile('<user-account class="account-dir">' +
                '</user-account>')(this.mockScope);
            this.mockScope.$apply();
        };
    }));

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            this.initDirective();

            expect(this.element).toBeDefined();
            expect(this.element.hasClass('account-dir')).toEqual(true);

            this.$timeout.flush();
            var controller = this.element.controller('userAccount');
            expect(controller.user).toEqual({
                id: 1,
                name: 'Test',
                email: 'test@dot.com'
            });
            expect(this.UserService.getUser.calls.count()).toEqual(1);
        });
    });

    describe('updating a user', function() {
        var vm;
        beforeEach(function() {
            this.initDirective();
            this.controller = this.element.controller('userAccount');
            this.$timeout.flush();
            vm = this;
        });

        it('does nothing if the form is not valid', function() {
            spyOn(this.UserService, 'updateUser');
            this.controller.saveChanges(false);

            expect(this.UserService.updateUser).not.toHaveBeenCalled();
        });

        it('Returns a success message correctly', function() {
            spyOn(this.UserService, 'updateUser').and.callFake(function() {
                return vm.$q.resolve({
                    error: false
                });
            });
            expect(this.controller.message).not.toBeDefined();

            this.controller.saveChanges(true);
            this.$timeout.flush(2000);

            expect(this.controller.message.error).toEqual(false);

            this.$timeout.flush(3000);
            expect(this.controller.message).not.toBeDefined();
        });

        it('returns an error message correctly', function() {
            spyOn(this.UserService, 'updateUser').and.callFake(function() {
                return vm.$q.resolve({
                    error: true
                });
            });

            expect(this.controller.message).not.toBeDefined();

            this.controller.saveChanges(true);
            this.$timeout.flush(2000);

            expect(this.controller.message.error).toEqual(true);

            this.$timeout.flush(3000);
            expect(this.controller.message).not.toBeDefined();
        });
    });
});
