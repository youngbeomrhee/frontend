class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.launchClock();
        this.state = { currentTime: new Date().toLocaleString('en') };
        console.log("this.state ->", this.state);
    }
    launchClock() {
        setInterval(() => {
            console.log('Updating time...');
            this.setState({
                currentTime: new Date().toLocaleString('en') // 매 초마다 현재 시각으로 상태를 갱신
            });
        }, 1000);
    }
    render() {
        return React.createElement(
            'div',
            null,
            this.state.currentTime
        );
    }
}