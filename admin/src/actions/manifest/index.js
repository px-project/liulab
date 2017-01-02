/**
 * 货单actions
 */
import { SELECT_MANIFEST } from '../../constants/';

// 选择操作action生成
function selectAction(manifest_id) {
    return {
        type: SELECT_MANIFEST,
        manifest_id
    };
}

// 选择操作
export function manifestSelect (manifest_id) {
    return dispatch => dispatch(selectAction(manifest_id));
}