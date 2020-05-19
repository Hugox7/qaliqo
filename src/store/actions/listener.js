import * as listenerTypes from '../types/listener';

export const handleError = (data) => ({
    type: listenerTypes.LISTENER,
    data,
});