const http = require('http');

// Hello node with HTML
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<h1>Hello Node</h1>');
}).listen(3000);

console.log('Server started on http://localhost:3000; press Ctrl + c to terminate...');



