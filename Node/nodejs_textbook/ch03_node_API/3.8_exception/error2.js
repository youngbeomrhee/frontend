const fs = require('fs');

setInterval(() => {
    console.log('시작');
    fs.unlink('./nowhere.js', (err) => {
        if (err) console.error(err);
    });
}, 1000);
