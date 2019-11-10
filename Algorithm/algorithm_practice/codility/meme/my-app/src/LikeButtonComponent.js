import React from 'react';

export default class LikeButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 100,
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        // 이미 좋아요가 눌려있던 상태면 -1, 아니면 +1
        const liked = this.state.liked;
        const score = liked ? this.state.score - 1 : this.state.score + 1;
        this.setState({
            score,
            liked: !liked
        });
    }

    render() {
        return (
            <button className={"like-button" + (this.state.liked ? ' liked' : '')} onClick={this.handleClick}>
                Like | <span className="likes-counter">{this.state.score}</span>
            </button>
        );
    }
}
