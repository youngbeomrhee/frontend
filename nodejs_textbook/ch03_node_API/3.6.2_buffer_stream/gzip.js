const zlib = require('zlib'),
    fs = require('fs'),
    readStream = fs.createReadStream('./readme4.txt'),
    zlibStream = zlib.createGzip(),
    writeStream = fs.createWriteStream('./readme4.txt.gz');

readStream
    .pipe(zlibStream)
    .pipe(writeStream);

