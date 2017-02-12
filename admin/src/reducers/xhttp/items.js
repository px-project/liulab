/**
 * xhttp items reducer
 */
import { XHTTP_RECEIVE } from '../../constants/';
import apis from '../../config/api.json';
import * as _ from 'lodash';

export let XhttpItemsReducers = {};

Object.keys(apis).map(_api => {
    XhttpItemsReducers[_api] = (state = [], action) => {
        let {type, options = {}, result} = action, {method, api, params} = options;

        if (!Object.keys(options).length || type !== XHTTP_RECEIVE || api !== _api) return state;

        let newState = _.cloneDeepWith(state);

        switch (method) {
            case 'list':
                return result.map(item => item._id);

            case 'detail':
                return newState.indexOf(result._id) >= 0 ? newState : newState.concat([result._id]);

            case 'create':
                return newState.concat([result._id]);

            case 'update':
                return newState;

            case 'delete':
                return newState.filter(_id => _id !== options.params[options.params.length - 1]);

            default:
                return newState;
        }
    };
});