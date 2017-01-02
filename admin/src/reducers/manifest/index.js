/**
 * 货单reducer
 */
import * as consts from '../../constants/';
import xhttp from '../xhttp/';
import { combineReducers } from 'redux';
const _ = require('lodash');

// 选择表单
function ManifestSelectReducer(status = [], actions) {
    if (actions.type !== consts.SELECT_MANIFEST) return status;

    let newState = _.cloneDeepWith(status);
    let index = newState.indexOf(actions.manifest_id);
    index >= 0 ? newState.splice(index, 1) : newState.push(actions.manifest_id);
    return newState;
}

export const ManifestReducers = combineReducers(Object.assign({}, xhttp.manifest, {
    selected: ManifestSelectReducer
}));