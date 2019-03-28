let request = require('supertest');
const async = require('async');
require('dotenv').config({
    // path: './.env'  // default
    path: './.env.test'
});

const url = process.env.API_SERVER_DOMAIN + ':' + process.env.API_SERVER_PORT;
const userId = process.env.USER_ID;
const userPwd = process.env.USER_PASSWORD;
const urlLogin = process.env.URL_LOGIN;
const urlGetUserInfo = process.env.URL_GET_USER_INFO;

console.log(`url : ${url}
userId : ${userId}
userPwd : ${userPwd}
loginUrl : ${urlLogin}
urlGetUserInfo : ${urlGetUserInfo}
`);

describe('api server test', function() {
    let token;
    before('login and get auth token', function(done) {
        request(url)
            .post(urlLogin)
            .send({
                email: userId,
                password: userPwd
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                console.dir(res.body);
                token = res.body.token;
                done();
            });
    });

    it('responds with json', function(done) {
        // console.dir(result);
        request(url)
            .get(urlGetUserInfo)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                console.dir(res.body);
                done();
            });
    });
});


describe('api server test using async', function() {
    it('responds with json', function(done) {
        async.waterfall([
            function(callback) {
                request(url)
                    .post(urlLogin)
                    .send({
                        email: userId,
                        password: userPwd
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return callback(err);
                        console.dir(res.body);
                        let token = res.body.token;
                        callback(null, token);
                    });
            },
            function(token, callback) {
                request(url)
                    .get(urlGetUserInfo)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer '+token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return callback(err);
                        console.dir(res.body);
                        callback(null, done());     // if your process has ended, call "done" method to end "it" method
                    });
            }
        ], function (err, result) {
            // result now equals 'done'
            console.error(err);
        });
    });
});