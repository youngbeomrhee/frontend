import React from "react";

const Score = ({ turn }) => (
    <div className="score">
        <h4>완성</h4>
        <div className="score-board" turn={turn} />
    </div>
);


export default Score;