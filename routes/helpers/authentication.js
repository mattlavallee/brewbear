(function() {
    'use strict';

    var UserAuthModule = function() {
        var _this = this;
        var unauthorizedUrl = '/';
        var authorizedUrl = '/my/beers';

        /**
         * @description redirects to main landing page if user
         * unsuccessfully attempts to access a protected page
         */
        function _validateAuthenticatedPage(request, response) {
            if (request.isAuthenticated() === false) {
                response.redirect(unauthorizedUrl);
                return false;
            }
            return true;
        }

        /**
         * @description redirects to the main authenticated page
         * if the user tries to hit a public page while logged in
         * They should log out if they want to do that :)
         */
        function _validateUnauthenticatedPage(request, response) {
            if (request.isAuthenticated() === true) {
                response.redirect(authorizedUrl);
                return false;
            }
            return true;
        }

        /**
         * @description Handles url redirects from
         * authorized and unauthorized pages
         * @param {object} request - the current request object
         * @param {object} response - the current response object
         * @param {boolean} isAuthPage - true if checking authorization
         * from an auth page. False if checking from a public page
         */
        _this.userValidated = function(request, response, isAuthPage) {
            if (isAuthPage) {
                return _validateAuthenticatedPage(request, response);
            } else {
                return _validateUnauthenticatedPage(request, response);
            }
        };
    };

    module.exports = new UserAuthModule();
})();
