const start = (state = [], action="INIT") => {
    switch (action.type) {
        case 'INIT':
            alert('start init');
            return {
                ...state,
                restart: false,
                isFinish: false
            };
        case 'RESTART_GAME':
            return {
                ...state,
                restart: true,
                isFinish: false
            };
        default:
            // return state;
            return {
                ...state,
                restart: false,
                isFinish: false
            };
    }
};

export default start;

