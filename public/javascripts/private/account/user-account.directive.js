(function() {
    'use strict';

    function UserAccount(UserService, $timeout) {
        return {
            restrict: 'E',
            templateUrl: '/javascripts/private/account/account.template.html',
            controller: function() {
                var vm = this;

                vm.user = {
                    id: -1,
                    name: '',
                    email: ''
                };
                vm.message = _.noop();

                UserService.getUser().then(function(result) {
                    vm.user = result.user;
                });

                vm.saveChanges = function(formValid) {
                    if (formValid) {
                        UserService.updateUser(vm.user).then(function(result) {
                            if (result.error) {
                                vm.message = {
                                    text:
                                        'Error updating your account settings',
                                    error: true
                                };
                            } else {
                                vm.message = {
                                    text: 'Account settings updated!',
                                    error: false
                                };
                            }

                            $timeout(function() {
                                vm.message = _.noop();
                            }, 2500);
                        });
                    }
                };
            },
            controllerAs: 'ctrl'
        };
    }

    angular.module('brewbear-component').directive('userAccount', UserAccount);
})();
