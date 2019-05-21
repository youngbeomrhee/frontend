// import React from 'react'
import { connect } from 'react-redux'
import { restartGame, handleClick } from '../actions'
import Board from '../components/Board'


function getSequentialNumber(start, end) {
    let temp = start;
    const arr = [];
    while(temp<=end) {
        arr.push(temp);
        temp++;
    }
    return arr;
}

function shuffle(arr) {
    return arr.sort(() => 0.5-Math.random());
}

function setStateBingo(state, turn, rows, cols, numbers) {
    function Bingo(turn, row, col, number) {
        return {
            id: ''+turn+row+col,    // 100, 101, 102, ...
            turn,
            row,
            col,
            number,
            isChecked: false
        }
    }

    let idx = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            state.bingos.data.push(Bingo(turn, i, j, numbers[idx]));
            idx++;
        }
    }
}

const mapStateToProps = (state, props) => {

    const {turn, rows, cols} = props,
        totalLength = rows * cols,
        numbers = state.start.restart ? shuffle(getSequentialNumber(1, totalLength)) : Array(totalLength).fill('');

    if(state.start.restart) {
        setStateBingo(state, turn, rows, cols, numbers);
    }

    return ({
        ...state,
        numbers: numbers,
        restart: state.start.restart
    });
}

const mapDispatchToProps = dispatch => ({
    handleClick: _ => dispatch(handleClick()),
});

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(Board);
