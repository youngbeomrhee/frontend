const fs = require('fs'),
    readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16}),     // highWaterMark: default 64 kb(64000 bytes)
    data = [];

readStream.on('data', chunk => {
    data.push(chunk);
    console.log('#data', "chunk ->", chunk, '[' + chunk.length + ']', ': ' + chunk.toString('utf8'));
});

readStream.on('end', () => {
    console.log('#end', "Buffer.cssoncat(data).toString() ->", Buffer.concat(data).toString());
});

readSsssstream.on('error', err => {
    console.errosr(err);
});