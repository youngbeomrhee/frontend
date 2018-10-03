class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.launchClock();
        this.state = { currentTime: new Date().toLocaleString('en') };
    }
    launchClock() {
        setInterval(() => {
            console.log('Updating time...');
            this.setState({
                currentTime: new Date().toLocaleString('en') // 매 초마다 현재 시각으로 상태를 갱
            });
        }, 1000);
    }
    render() {
        console.log('Rendering...');
        return <div>
            <AnalogDisplay time={this.state.currentTime}/>
            <DigitalDisplay time={this.state.currentTime}/>
        </div>;
    }
}