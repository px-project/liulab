/**
 * 货单reducer
 */
import { SELECT_MANIFEST } from '../../constants';
import { XhttpReducers } from '../xhttp';
import { combineReducers } from 'redux';
import * as _ from 'lodash';

// 选择表单
function ManifestSelectReducer(state = [], action) {
    let {type, manifest_id} = action;

    if (type !== SELECT_MANIFEST) return state;

    let newState = _.cloneDeepWith(state);

    let index = newState.indexOf(manifest_id);

    index >= 0 ? newState.splice(index, 1) : newState.push(manifest_id);

    return newState;
}

export const ManifestReducers = combineReducers(Object.assign({}, XhttpReducers.manifest, {
    selected: ManifestSelectReducer
}));