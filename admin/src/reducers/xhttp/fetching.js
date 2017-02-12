/**
 * xhttp fetching reducer
 */
import { XHTTP_BEGIN } from '../../constants/';
import apis from '../../config/api.json';

export let XhttpFetchingReducers = {};

Object.keys(apis).map(_api => {
    XhttpFetchingReducers[_api] = (state = false, action) => {
        let {type, options = {}} = action, {api} = options;

        if (!Object.keys(options).length || api !== _api) return state;

        return type === XHTTP_BEGIN;
    }
});