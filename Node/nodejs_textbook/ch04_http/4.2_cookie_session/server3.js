const http = require('http'),
    parseCookies = (cookie='') => (
        cookie
            .split(';')
            .map(v => v.split('='))
            .map(([k, ...vs]) => [k, vs.join('=')])
            .reduce((acc, [k, v]) => {
                acc[k.trim()] = decodeURIComponent(v);
                return acc;
            }, {})
    );

http.createServer((req, res) => {
    const cookieStr = req.headers.cookie,
        cookies = parseCookies(cookieStr);
    // console.log("cookieStr ->", cookieStr);
    console.log("req.url ->", req.url);
    console.log("cookies ->", cookies);
    res.writeHead(200, {
        'Set-cookie': ['mycookie10=test10','mycookie11=test11']
    });
    res.end('Hello cookie');
}).listen(8082, () => {
    console.log('8082번 포트에서 서버가 대기중입니다.');
});




