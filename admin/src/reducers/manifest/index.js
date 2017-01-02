/**
 * 货单reducer
 */
import * as consts from '../../constants/';
import xhttp from '../xhttp/';
import { combineReducers } from 'redux';
const _ = require('lodash');

// 选择表单
function ManifestSelectReducer(status = [], actions) {
    if (actions.type === consts.SELECT_MANIFEST) {
        let newState = _.cloneDeepWith(status);
        return newState;
    }
    return status;
}

export const ManifestReducers = combineReducers(Object.assign({}, xhttp.manifest, {
    selected: ManifestSelectReducer
}));