/**
 * xhttp detail reducer
 */
import * as consts from '../../constants/';
import apis from '../../config/api.json';
const _ = require('lodash');

export function XhttpDetailReducer(api) {
    return (state = '', actions) => {
        if (actions.type === consts.XHTTP_RECEIVE && api === actions.options.api && actions.options.method === 'detail') return actions.result._id;
        return state;
    };
}