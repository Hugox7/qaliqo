import { combineReducers } from 'redux';
import error from './error';


const mainReducer = combineReducers({
    error,
})

export default mainReducer;