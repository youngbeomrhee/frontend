const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'a secret');

hmac.on('readable', () => {
    // Only one element is going to be produced by the
    // hash stream.
    const data = hmac.read();
    if (data) {
        console.log(data.toString('hex'));
        // Prints:
        //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
    }
});

hmac.write('some data to hash');
hmac.end();