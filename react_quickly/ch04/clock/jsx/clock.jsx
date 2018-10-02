class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentTime: (new Date()).toLocaleString('en')}
    }
    render() {
        return <div>{this.state.currentTime}</div>
    }
}
