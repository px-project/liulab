/**
 * xhttp items reducer
 */
import * as consts from '../../constants/';
import apis from '../../config/api.json';
const _ = require('lodash');


let XhttpItemsReducers = {};

for (let api in apis) {
    XhttpItemsReducers[api] = (state = [], actions) => {
        if (!actions.options || actions.type !== consts.XHTTP_RECEIVE || api !== actions.options.api) return state;

        let newState = _.cloneDeepWith(state);

        switch (actions.options.method) {
            case 'list':
                return actions.result.map(item => item._id);

            case 'detail':
                return newState.indexOf(actions.result._id) >= 0 ? newState : newState.concat([actions.result._id]);

            case 'create':
                return newState.concat([actions.result._id]);

            case 'update':
                return newState;

            case 'delete':
                return newState.filter(_id => _id !== actions.options.params[actions.options.params.length - 1]);

            default:
                return newState;
        }
    }
}

export default XhttpItemsReducers;