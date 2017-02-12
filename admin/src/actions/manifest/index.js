/**
 * 货单actions
 */
import { SELECT_MANIFEST } from '../../constants/';

// 选择货单
function selectManifestAction(manifest_id) {
    return {
        type: SELECT_MANIFEST,
        manifest_id
    };
}

// 选择货单
export function selectManifest(manifest_id) {
    return dispatch => dispatch(selectManifestAction(manifest_id));
}