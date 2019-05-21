import React from "react";

const Column = ({ turn, row, col, number, handleClick }) => (<div className="column" onClick={()=>handleClick(number)} turn={turn} row={row} col={col}>{number}</div>);

export default Column;