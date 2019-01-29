var nodemailer = require('nodemailer');
var credentials = require('./credentials');

var mailTransport = nodemailer.createTransport('SMTP', {
    service: 'gmail',
    auth: {
        user: credentials.gmail.user,
        password: credentials.gmail.password
    }
});

