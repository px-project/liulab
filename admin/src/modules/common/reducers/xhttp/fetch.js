/**
 * xhttp fetching reducer
 */
import { XHTTP_BEGIN } from '../../constants';

export const XhttpFetchReducer = _api => (state = false, actions) => {

    let { api, type } = actions;
    
    if (api === _api) return type === XHTTP_BEGIN;

    return state;
};