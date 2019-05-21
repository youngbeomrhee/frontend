import React from "react";
import Row from "./Row";

const Board = ({ turn, rows, cols, restart, numbers, handleClick }) => {
    const length = rows * cols,
        resultRows = [];
    for (let i = 0; i < rows; i++) {
        resultRows.push(<Row key={turn+i} turn={turn} row={i} cols={cols} numbers={numbers.splice(0, cols)} handleClick={handleClick}/>);
    }

    return (<div className="board">
        {resultRows}
    </div>);
};


export default Board;