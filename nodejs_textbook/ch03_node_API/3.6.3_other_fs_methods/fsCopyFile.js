const fs = require('fs');

fs.copyFile('./readme5.txt', './writeme4.txt', err => {
    if (err) throw err;
    console.log('복사 완료');
});