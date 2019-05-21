export const restartGame = restart => {
    return ({
        type: 'RESTART_GAME',
        restart: false
    });
}

export const handleClick = number => {
    return ({
        type: 'HANDLE_CLICK',
        number
    });
}


