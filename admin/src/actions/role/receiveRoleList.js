/**
 * 接受角色列表
 */
import { RECEIVE_ROLE_LIST } from '../../constants/role';

export function receiveRoleList(condition, result) {
    return {
        type: RECEIVE_ROLE_LIST,
        condition,
        result,
        receiveAt: Date.now()
    }
}
