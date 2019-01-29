const fs = require('fs');

console.log('시작');
console.log('1번', fs.readFileSync('./readme2.txt').toString());
console.log('2번', fs.readFileSync('./readme2.txt').toString());
console.log('3번', fs.readFileSync('./readme2.txt').toString());
console.log('끝');