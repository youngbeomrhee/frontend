import React from 'react';

// <Mouse> 컴포넌트는 우리가 원하는 행위를 캡슐화 합니다...
class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

                {/* ...하지만 <p>가 아닌 다른것을 렌더링하려면 어떻게 해야 할까요? */}
                <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
            </div>
        );
    }
}

class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <h1>Move the mouse around!</h1>
                <Mouse />
            </div>
        );
    }
}