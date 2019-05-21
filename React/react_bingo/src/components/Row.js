import React from "react";
import Column from "./Column";

const Row = ({ turn, row, cols, numbers, handleClick }) => {

    const resultCols = [];

    for (let i = 0; i < cols; i++) {
        resultCols.push(<Column key={''+turn+row+i} turn={turn} row={row} col={i} number={numbers[i]} handleClick={handleClick}/>);
    }

    return (<div className="row">
        {resultCols}
    </div>);
};


export default Row;