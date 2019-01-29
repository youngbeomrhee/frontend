const express = require('express'),
    app = express();

app.set('port', process.env.PORT || 3000);

// app.use([path='/',] callback [, callback...])를 사용하여 middleware 추가
// path의 default 값이 '/'이므로 생략할 경우 모든 요청에 대해서 실행됨
app.use((req, res, next) => {
    console.log("req.url ->", req.url);
    console.log('해당 미들웨어는 모든 요청에 대해 실행됨');
    next(); // 미들웨어가 여러 개 들어가 있는 경우 먼저 실행된 미들웨어에서 next()를 호출해주지 않으면 다음으로 넘어가지 않는다.
});

// Request에 따른 response
app.get('/', (req, res) => {
    res.type('text/html');
    res.send('<h1>Meadowlark Travel</h1><a href="/about">about</a>');
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.send('<h1>About Meadowlark Travel</h1><a href="/">home</a>');
});


app.use((req, res, next) => {
    console.log("req.url ->", req.url);
    console.log('해당 미들웨어는 모든 요청에 대해 실행됨. 단 root(/)의 경우에는 app.get(req, res) => { ... } 에서 이미 응답을 보내 버리므로 실행되지 않음.');
    next(new Error('error test')); // 미들웨어가 여러 개 들어가 있는 경우 먼저 실행된 미들웨어에서 next()를 호출해주지 않으면 다음으로 넘어가지 않기 때문에 해당 영역을 주석처리하면 커스텀 404 페이지가 호출되지 않는다.
});

// 커스텀 404 페이지
// 모든 요청에 대한 처리기이므로 해당 영역의 선언위치가 중요하다. 가장 앞에 기술되면 모든 요청이 404 에러로 떨어짐
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

const errHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
};

// 커스텀 500 페이지
app.use(errHandler);

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate...`);
});