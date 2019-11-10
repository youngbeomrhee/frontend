import React from 'react';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 100,
            liked: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const score = this.state.liked ? -1 : 1;

        this.setState({
            score: this.state.score + (score),
            liked: !this.state.liked
        });
    }

    render() {
        return (
            <button className={"like-button" + (this.state.liked ? ' liked' : '')} onClick={this.handleChange}>
                Like | <span className="likes-counter">{this.state.score}</span>
            </button>
        );
    }
}

export default LikeButton;