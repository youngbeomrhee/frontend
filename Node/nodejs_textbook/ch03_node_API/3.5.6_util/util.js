/**
 * Created by whybe on 2018. 9. 28..
 */
const util = require('util'),
    crypto = require('crypto');

const donUseMe = util.deprecate((x, y) => {
    return x + y;
}, 'donUseMe 함수는 deprecated 되었으니 사용하지 마세요');
donUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then(buf => {
        console.log("buf.toString('base64') ->", buf.toString('base64'));
    })
    .catch(error => {
        console.error(error);
    });
