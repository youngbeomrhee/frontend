import React from "react";
import Button from '@material-ui/core/Button';

const Start = ({ restart, restartGame }) => {
    console.log(restart);
    const title = restart ? '게임 재시작': '게임 시작';
    return (
        <div className="start">
            <Button variant="contained" color="primary" onClick={() => restartGame(false)}>{title}</Button>
        </div>
    );
}

export default Start;