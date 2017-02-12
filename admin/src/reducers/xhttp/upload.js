/**
 * xhttp upload reducers
 */
import apis from '../../config/api.json';
import { XHTTP_RECEIVE } from '../../constants';

export let XhttpUploadReducers = {};

Object.keys(apis).map(_api => {
    XhttpUploadReducers[_api] = (state = '', action) => {
        let {type, options = {}, result} = action, {api, method} = options;

        if (Object.keys(options).length && type === XHTTP_RECEIVE && api === _api && method === 'upload') return result._id;

        return state;
    }
});