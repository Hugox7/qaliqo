import { combineReducers } from 'redux';
import error from './error';
import listener from './listener';


const mainReducer = combineReducers({
    error,
    listener,
})

export default mainReducer;