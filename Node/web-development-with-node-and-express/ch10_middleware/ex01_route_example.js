const express = require('express'),
    app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {   // path를 생략하면 '/*'와 같다. 즉 모든 요청에 대해 처리된다
    console.log('모든 요청에 대한 처리');
    next();
});

app.get('/', (req, res, next) => {
    res.type('text/html');
    res.send('<h1>Hello node</h1>');
});

// 404 페이지
app.use((req, res, next) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// default error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate...`);
});