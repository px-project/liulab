/**
 * xhttp detail reducers
 */
import { XHTTP_RECEIVE } from '../../constants';
import apis from '../../config/api.json';

export let XhttpDetailReducers = {};

Object.keys(apis).map(_api => {
    XhttpDetailReducers[_api] = (state = '', action) => {
        let {type, options = {}, result} = action, {api, method} = options;

        if (Object.keys(options).length && type === XHTTP_RECEIVE && api === _api && method === 'detail') return result._id;

        return state;
    }
});