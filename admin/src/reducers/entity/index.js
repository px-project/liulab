/**
 * 实体reducer
 */
import * as consts from '../../constants/xhttp';
const _ = require('lodash');

export default function EntityReducer(state = {}, actions) {
    if (actions.type === consts.XHTTP_RECEIVE) {
        let newState = _.cloneDeepWith(state);

        switch (actions.options.method) {
            case 'list':
                return Object.assign(newState, ...actions.result.map(item => ({ [item._id]: item })));

            case 'detail':
            case 'create':
            case 'update':
                newState[actions.result._id] = actions.result;
                return newState;

            case 'delete':
                delete newState[actions.result._id];
                return newState;

            default:
                console.error('param error: actions is not one of [list, detail, create, update, delete]');
        }
    }
    return state;
}
