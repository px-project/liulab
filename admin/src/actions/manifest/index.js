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

function unselectAction (manifest_ids) {
    return {
        type: UNSELECT_MANIFEST,
        manifest_ids
    }
}



// 选择操作
export function manifestSelect (manifest_id) {
    return dispatch => dispatch(selectAction(manifest_id));
}

// 取消选择
export function manifestUnselect () {

}