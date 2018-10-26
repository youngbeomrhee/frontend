const express = require('express'),
    app = express();

app.set('port', process.env.PORT || 3000);

// Request에 따른 response
app.get('/', (req, res) => {
    res.type('text/html');
    res.send('<h1>Meadowlark Travel</h1><a href="/about">about</a>');
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.send('<h1>About Meadowlark Travel</h1><a href="/">home</a>');
});

// 커스텀 404 페이지
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