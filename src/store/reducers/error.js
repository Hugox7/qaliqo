import { combineReducers } from 'redux';
import * as errorTypes from '../types/error';

const errorInitState = {
    loginError: null,
    resetPasswordError: null,
    signupError: null,
}

const handleError = (state = errorInitState, action) => {
    switch (action.type) {
        case errorTypes.SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.data,
                
            };
        case errorTypes.SET_RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordError: action.data,
            };
        case errorTypes.SET_SIGNUP_ERROR:
            return {
                ...state,
                signupError: action.data,
            };
        default:
            return state;
    }
}

export default combineReducers({ 
    handleError,
});