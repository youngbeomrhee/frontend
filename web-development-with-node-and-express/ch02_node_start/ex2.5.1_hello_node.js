const http = require('http');

// Hello node
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Hello Node');
}).listen(3000);

console.log('Server started on http://localhost:3000; press Ctrl + c to terminate...');



