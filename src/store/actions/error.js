import * as errorTypes from '../types/error';

export const handleError = (data) => ({
    type: errorTypes.SET_LOGIN_ERROR,
    data,
})