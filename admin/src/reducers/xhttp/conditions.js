/**
 * xhttp conditions reducer
 */
import apis from '../../config/api.json';
import { XHTTP_BEGIN } from '../../constants';

export let XhttpConditionsReducers = {};

Object.keys(apis).map(_api => {
    XhttpConditionsReducers[_api] = (state = {}, action) => {
        let {type, options = {}} = action, {api, conditions = {}, method} = options;

        if (Object.keys(options).length && type === XHTTP_BEGIN && api === _api && method === 'list') return conditions;

        return state;
    };
});