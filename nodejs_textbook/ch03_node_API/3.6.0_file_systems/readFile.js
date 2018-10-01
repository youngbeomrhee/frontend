const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if(err) throw err;

    console.log("data ->", data);
    console.log("data.toString() ->", data.toString());
});