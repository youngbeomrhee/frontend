const http = require('http'),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    responseCode = responseCode || 200;
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-type': 'text/plain'});
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-type': contentType});
            res.end(data);
        }
    });
}

// url에서 쿼리스트링과 마지막 옵션인 슬래쉬를 제외하고 나머지 글자를 소문자로 바꿔서 정규화
http.createServer(function (req, res) {
    console.log(req.url);
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    let resource = '';

    switch (path) {
        case '':
            resource = '/public/home.html';
            serveStaticFile(res, resource, 'text/html');
            break;
        case '/about':
            resource = '/public/about.html';
            serveStaticFile(res, resource, 'text/html');
            break;
        case '/img/logo':
            resource = '/public/img/logo.jpg';
            serveStaticFile(res, resource, 'image/jpeg');
            break;
        default:
            resource = '/public/404.html';
            serveStaticFile(res, resource, 404);
            break;
    }
}).listen(3000);

console.log('Server started on http://localhost:3000; press Ctrl + c to terminate...');



