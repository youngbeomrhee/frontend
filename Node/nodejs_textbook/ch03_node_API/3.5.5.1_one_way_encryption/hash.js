/**
 * Created by whybe on 2018. 9. 28..
 */
const crypto = require('crypto');

console.log('비밀번호 -> md5 -> base64:', crypto.createHash('md5').update('비밀번호').digest('base64'));
console.log('비밀번호 -> sha1 -> base64:', crypto.createHash('sha1').update('비밀번호').digest('base64'));
console.log('비밀번호 -> sha256 -> base64:', crypto.createHash('sha256').update('비밀번호').digest('base64'));
console.log('비밀번호 -> sha512 -> base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('길이가 다른 비밀번호 -> sha512 -> base64 :', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
console.log('비밀번호 -> hex :', crypto.createHash('sha512').update('비밀번호').digest('hex'));


