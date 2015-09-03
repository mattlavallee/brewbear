(function() {
    'use strict';

    angular.module('brewbear-templates', []);
    angular.module('bb-static', []);

    angular.module('brewbear', ['bb-static', 'brewbear-templates']);
})();
