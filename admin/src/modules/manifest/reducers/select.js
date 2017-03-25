/**
 * 选择货单reducer
 */
import { SELECT_MANIFEST } from '../constants';
import { cloneDeepWith } from 'lodash';

export function selectManifestReducer(state = [], action) {
    let result = cloneDeepWith(state);
    const { type, manifest_id } = action;
    if (type === SELECT_MANIFEST) {
        let index = result.indexOf(manifest_id);
        if (index >= 0) result.splice(index, 1);
        else result.push(manifest_id);
    }

    return result;
};