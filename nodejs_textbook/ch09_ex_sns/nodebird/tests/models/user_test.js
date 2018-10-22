// const user = require('../../models/user');
const sequelize = require('../../models').sequelize;
sequelize.sync();

const User = require('../../models').User;

describe('users sequelize : ', function() {

    it('should not be thrown => 모든 attribute가 조회 가능한 상태인지 테스트', function () {
        return new Promise(function(resolve, reject) {
            User.findAll({
                    attributes: ['email', 'nick', 'password', 'provider', 'snsId', 'createdAt', 'updatedAt', 'deletedAt']
                })
                .then((users) => {
                    resolve(users);
                })
                .catch((err) => {
                    reject(err);
                });
        });
        expect(function () {
            selectUserPromise
                .then(function (result) {
                    console.log("# result ->", result);
                })
                .catch(function (err) {
                    throw Error(err);
                });
        }).not.toThrow();
    });

    /*
    describe('test', function() {
        beforeEach(function() {
            return new Promise(function(resolve, reject) {
                try {
                    User.findAll({
                        attributes: ['nowhere', 'email', 'nick', 'password', 'provider', 'snsId', 'createdAt', 'updatedAt', 'deletedAt']
                    })
                    .then((users) => {
                        resolve(users);
                    })
                    .catch((err) => {
                        console.log();
                        reject(err);
                    });
                } catch (e) {
                    reject(e);
                };
            });
        });
    });
    */
    /*
    it('should not be thrown => 모든 attribute가 조회 가능한 상태인지 테스트', function () {
        return new Promise(function(resolve, reject) {
            expect(function () {
                try {
                    User.findAll({
                        attributes: ['nowhere', 'email', 'nick', 'password', 'provider', 'snsId', 'createdAt', 'updatedAt', 'deletedAt']
                    })
                    .then((users) => {
                        resolve(users);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                } catch(err) {
                    throw Error(err);
                }
            }).toThrow();
        });
        // expect(function () {
        //     selectUserPromise
        //         .then(function (result) {
        //             console.log("# result ->", result);
        //         })
        //         .catch(function (err) {
        //             throw Error(err);
        //         });
        // }).toThrow();
    });
    */
/*
    it('should be thrown ', function () {
        expect(function () {
            return new Promise(function(resolve, reject) {
                User.findAll({
                    attributes: ['nowhere', 'email', 'nick', 'password', 'provider', 'snsId', 'createdAt', 'updatedAt', 'deletedAt']
                })
                    .then((users) => {
                        resolve(users);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }).then(function (result) {
            }).catch(function (err) {
                throw Error(err);
            });
        }).toThrow();
    });
    */
    /*
    describe('select nowhere field ', function () {
        try {
            let sequelizePromise;

            beforeEach(function() {
                try {
                    sequelizePromise = new Promise(function(resolve, reject) {
                            User.findAll({
                                attributes: ['nowhere', 'email', 'nick', 'password', 'provider', 'snsId', 'createdAt', 'updatedAt', 'deletedAt']
                            })
                            .then((users) => {
                                console.log('#####1');
                                resolve(users);
                            })
                            .catch((err) => {
                                console.log('#####2');
                                reject(err);
                                // throw Error(err);
                            });
                    });
                } catch(e) {
                    console.error(e);
                }
                return sequelizePromise;
            });

            it('should be thrown', function () {
                try {
                    // expect(function () {
                    // console.log('######7');
                        sequelizePromise
                            .then(function (result) {
                                console.log("###### result ->", result);
                            })
                            .catch(function (err) {
                                console.log('######4');
                                // throw Error(err);
                            });
                    // }).toThrow();
                } catch(e) {
                    console.log('######8');
                    console.error(e);
                }

            });
        } catch(e) {
            console.log('#####9');
            console.error(e);
        }
    });
    */
});

