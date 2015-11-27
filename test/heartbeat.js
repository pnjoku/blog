var app = require('../app'),
    request = require('supertest');

describe('Blog HeartBeat Test', function() {
    describe('When requesting resource /heartbeat', function() {
        it('Should respond with http 200', function(done) {
            request(app)
                .get('/heartbeat')
                .expect(200, done);
        });
    });
});


