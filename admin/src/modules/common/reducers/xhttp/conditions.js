/**
 * xhttp conditions reducer
 */
import { XHTTP_BEGIN } from '../../constants';

export const XhttpConditionsReducer = _api => (state = {}, action) => {

    let { type, options = {} } = action, { api, conditions = {}, method } = options;

    if (Object.keys(options).length && type == XHTTP_BEGIN && api === _api && method === 'list') return conditions;

    return state;

};