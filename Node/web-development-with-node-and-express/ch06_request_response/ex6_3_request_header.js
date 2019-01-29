const app = require('express')();

app.set('port', process.env.port || 3000);

app.get('/', (req, res) => {

    // res.writeHead(200, {'Content-type': 'text/html'});
    res.set('Content-type', 'text/html');
    let s = '{Request header: {\n';
    for(let name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    s += '}}\n';
    res.end(s);
});

app.listen(app.get('port'), () => {
    console.log('Server is running on http://localhost:' + app.get('port'));
});