const app = require('express')(),
    fs = require('fs');

app.set('port', process.env.port || 3000);

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/ex6_4_response_header.html', (err, data) => {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(data);
    });
});

app.listen(app.get('port'), () => {
    console.log('Server is running on http://localhost:' + app.get('port'));
});