import { combineReducers } from 'redux';
import * as errorTypes from '../types/error';

const errorInitState = {
    loginError: null,
}

const handleError = (state = errorInitState, action) => {
    switch (action.type) {
        case errorTypes.SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.data,
                
            };
        default:
            return state;
    }
}

export default combineReducers({ 
    handleError,
});