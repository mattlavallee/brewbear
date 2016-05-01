(function(){
    'use strict';

    var configVals = {
        sessionSecret: process.env.SESSION_SECRET,
        google: {
            clientId: process.env.GOOG_CLIENTID,
            clientSecret: process.env.GOOG_CLIENTSECRET,
            callback: 'http://127.0.0.1:3000/login/google/return'
        },
        facebook: {
            clientId: process.env.FB_CLIENTID,
            clientSecret: process.env.FB_CLIENTSECRET,
            callback: 'http://127.0.0.1:3000/login/facebook/return'
        },
        database: {
            connString: process.env.DATABASE_URL,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: 5432,
            db: process.env.DATABASE_DB
        }
    };

    if(process.env.NODE_ENV === 'production'){
        module.exports = productionConfigVals;
    } else{
        var privateConfig = require('./private');
        module.exports = privateConfig;
    }
})();
