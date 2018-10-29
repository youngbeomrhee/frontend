const express = require('express'),
    app = express(),
    handlebars = require('express-handlebars').create({defaultLayout: 'main'}),
    fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
    ],
    errHandler = (err, req, res, next) => {
        console.error(err);
        res.status(500);
        res.render('500');
    };

app.engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars')
    .set('port', process.env.PORT || 3000)
    .use(express.static(__dirname + '/public'))
    .get('/', (req, res) => {
        res.render('home');
    })
    .get('/about', (req, res) => {
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        res.render('about', {fortune: randomFortune});
    })
    .use((req, res) => {
        res.status(404);
        res.render('404');
    })
    .use(errHandler)
    .listen(app.get('port'), () => {
        console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate...`);
    });