const fs = require('fs'),
    readStream = fs.createReadStream('./readme4.txt'),
    writeStream = fs.createWriteStream('./writeme3.txt');

readStream.pipe(writeStream);