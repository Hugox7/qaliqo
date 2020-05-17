import * as errorTypes from '../types/error';

export const handleError = (data) => ({
    type: errorTypes.SET_LOGIN_ERROR,
    data,
});

export const handleResetPasswordError = (data) => ({
    type: errorTypes.SET_RESET_PASSWORD_ERROR,
    data,
});

export const handleSignUpError = (data) => ({
    type: errorTypes.SET_SIGNUP_ERROR,
    data,
});