/**
 * Created by whybe on 2018. 9. 28..
 */
const crypto = require('crypto'),
    cipher = crypto.createCipher('aes-256-cbc', '열쇠'),
    decipher = crypto.createDecipher('aes-256-cbc', '열쇠');

console.log("crypto.getCiphers() ->", crypto.getCiphers().toString().split(',').join('\n')); // 사용가능한 알고리즘 목록 전체 출
console.log();

let cipherResult = cipher.update('암호화할 문장', 'utf8', 'base64');  // update(data, inputEncoding, outputEncoding['latin1', 'base64', 'hex'])
cipherResult += cipher.final('base64');
console.log("cipherResult ->", cipherResult);

let decipherResult = decipher.update(cipherResult, 'base64', 'utf8');   // update(data, inputEncoding['latin1', 'base64', 'hex'], outputEncoding)
decipherResult += decipher.final('utf8');
console.log("decipherResult ->", decipherResult);



