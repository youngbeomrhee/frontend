const http = require('http');

// url에서 쿼리스트링과 마지막 옵션인 슬래쉬를 제외하고 나머지 글자를 소문자로 바꿔서 정규화
http.createServer(function (req, res) {
    console.log(req.url);
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            res.writeHead(200, {'Content-type': 'text/plain'})
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, {'Content-type': 'text/plain'})
            res.end('About');
            break;
        default:
            res.writeHead(404, {'Content-type': 'text/plain'})
            res.end('Not Found');
            break;
    }
}).listen(3000);

console.log('Server started on http://localhost:3000; press Ctrl + c to terminate...');



