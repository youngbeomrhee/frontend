require('../css/main.css');

const React = require('react'),
    ReactDom = require('react-dom'),
    Content = require('./content.jsx');

ReactDom.render(
    <Content/>,
    document.getElementById('content')
);

