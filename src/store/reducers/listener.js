import { combineReducers } from 'redux';
import * as listenerTypes from '../types/listener';

const listenerInitState = {
    photoChange: false,
}

const listen = (state = listenerInitState, action) => {
    switch (action.type) {
        case listenerTypes.LISTENER:
            return {
                photoChange: action.data,
            };
        default:
            return state;
    }
}

export default combineReducers({
    listen,
});