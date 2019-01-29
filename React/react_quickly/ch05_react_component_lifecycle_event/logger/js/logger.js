class Logger extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }
  componentWillMount() {
    console.log('#1 componentWillMount is triggered');
  }
  componentDidMount(e) {
    console.log('#2 componentDidMount is triggered');
    console.log('DOM node: ', ReactDOM.findDOMNode(this));
  }
  componentWillReceiveProps(newProps) {
    console.log('#3 componentWillReceiveProps is triggered');
    console.log('new props: ', newProps);
  }
  shouldComponentUpdate(newProps, newState) {
    console.log('#4 shouldComponentUpdate is triggered');
    console.log('new props: ', newProps);
    console.log('new state: ', newState);
    return true;
  }
  componentWillUpdate(newProps, newState) {
    console.log('#5 componentWillUpdate is triggered');
    console.log('new props: ', newProps);
    console.log('new state: ', newState);
  }
  componentDidUpdate(oldProps, oldState) {
    console.log('#6 componentDidUpdate is triggered');
    console.log('new props: ', oldProps);
    console.log('old props: ', oldState);
  }
  componentWillUnmount() {
    console.log('#7 componentWillUnmount');
  }
  render() {
    // console.log('rendering... Display')
    return React.createElement(
      'div',
      null,
      this.props.time
    );
  }
}