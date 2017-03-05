/**
 * xhttp detail reducer
 */
import { XHTTP_RECEIVE } from '../../constants';

export const XhttpDetailReducer = _api => (state = '', action) => {

    let { type, options = {}, result } = action, { api, method } = options;

    if (type === XHTTP_RECEIVE && api === _api && method === 'detail') return result._id;

    return state;

};