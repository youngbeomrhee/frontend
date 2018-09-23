class HelloWorld extends React.Component {
    render() {
        return <h1 {...this.props}>Hello {this.props.frameworkName}</h1>;
    }
}

ReactDOM.render(
    <div>
        <HelloWorld id="ember" frameworkName='Ember.js' title="ember framework"/>
        <HelloWorld id="backbone" frameworkName='Backbone.js' title="backbone framework"/>
        <HelloWorld id="angular" frameworkName='Angular.js' title="angular framework"/>
    </div>,
    document.getElementById('content')
);