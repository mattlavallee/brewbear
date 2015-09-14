(function() {
    'use strict';

    angular.module('brewbear-services', []);
    angular.module('brewbear-component', ['brewbear-services']);
    angular.module('brewbear-templates', []);
    angular.module('bb-static', []);

    angular.module('brewbear',
        ['bb-static', 'brewbear-templates', 'brewbear-component']);
})();
