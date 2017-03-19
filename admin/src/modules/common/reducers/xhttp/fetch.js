/**
 * xhttp fetching reducer
 */
import { XHTTP_BEGIN, XHTTP_METHODS } from '../../constants';

export const XhttpFetchReducer = _api => (state = {}, action) => {
    let { options = {}, type } = action, { api, method } = options;
    if (api === _api) return Object.assign({}, state, { [method]: type === XHTTP_BEGIN });
    return state;
};