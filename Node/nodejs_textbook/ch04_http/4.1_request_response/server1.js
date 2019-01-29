const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello, Node!</h1>');
    res.end('<p>Hello, Server!</p>');
}).listen(8090, () => {
    console.log('8090번 포트에서 서버 대기 중입니다.');
});