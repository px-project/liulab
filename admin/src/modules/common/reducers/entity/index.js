/**
 * entity reducer.
 */
import { XHTTP_RECEIVE } from '../../constants';
import * as _ from 'lodash';

export const EntityReducer = (state = {}, action) => {
    let { type, options = {}, result } = action, { method } = options;

    let newState = _.cloneDeepWith(state);

    if (type !== XHTTP_RECEIVE) return newState;

    if (method === 'list') return Object.assign(newState, ...result.map(item => ({ [item._id]: item })));

    if (method === 'detail' || method === 'create' || method === 'update' || method === 'upload') {
        newState[result._id] = result;
        return newState;
    }

    if (method === 'delete') {
        delete newState[result._id];
        return newState;
    }

    return newState;
}
