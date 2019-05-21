import {combineReducers} from 'redux';
import bingos from './bingos';
import start from './start';
// import visibilityFilter from './visibilityFilter';

export default combineReducers({
    bingos,
    start
});
