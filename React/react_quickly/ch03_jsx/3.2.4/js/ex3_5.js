class HelloWorld extends React.Component {
    render() {
        return React.createElement(
            "h1",
            this.props,
            "Hello ",
            this.props.frameworkName
        );
    }
}

ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(HelloWorld, { id: "ember", frameworkName: "Ember.js", title: "ember framework" }),
    React.createElement(HelloWorld, { id: "backbone", frameworkName: "Backbone.js", title: "backbone framework" }),
    React.createElement(HelloWorld, { id: "angular", frameworkName: "Angular.js", title: "angular framework" })
), document.getElementById('content'));