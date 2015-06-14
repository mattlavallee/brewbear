(function(){
    'use strict';
    var configVals = {
        sessionSecret: 'sssh im a secret',
        google: {
            clientId: 'google-client-id',
            clientSecret: 'google-client-secret',
            callback: 'http://127.0.0.1:3000/login/google/callback'
        }
    };
    
    module.exports = configVals;
})();