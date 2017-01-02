/**
 * xhttp fetching reducer
 */
import * as consts from '../../constants/';
import apis from '../../config/api.json';

let XhttpFetchingReducers = {};

for (let api in apis) {
    XhttpFetchingReducers[api] = (state = false, actions) => {
        if (!actions.options || api !== actions.options.api) return state;

        switch (actions.type) {
            case consts.XHTTP_BEGIN:
                return true;

            default:
                return false;
        }
    };
}

export default XhttpFetchingReducers;