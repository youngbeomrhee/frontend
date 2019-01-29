class HelloWorld extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                '1. Hello world!'
            ),
            React.createElement(
                'h1',
                null,
                '2. Hello world!'
            )
        );
    }
}
ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('content'));