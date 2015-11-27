var mongoose = require('mongoose'),
    config = require('../lib/configuration'),
    connectionString = config.get('mongo:url'),
    options = {
        server: {
            poolSize: 10,
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
            }
        }, 
        replset: {
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS : 30000
            }
        }
    };

mongoose.connection.open(connectionString, options);
