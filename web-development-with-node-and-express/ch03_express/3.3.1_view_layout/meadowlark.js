const express = require('express'),
    app = express(),
    handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

// 커스텀 404 페이지
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

const errHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.render('500');
};

// 커스텀 500 페이지
app.use(errHandler);

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate...`);
});