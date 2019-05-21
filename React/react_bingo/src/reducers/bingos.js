

const bingos = (state = [], action="INIT") => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                data: [],
                totalLength: 25,
                init: true
            };
        case 'HANDLE_CLICK':
            return {
                ...state/*,
                data: state.data.map(

                )*/
            }
        default:
            return {
                ...state,
                data: [],
                totalLength: 25,
                init: true
            };
    }
};

export default bingos;

