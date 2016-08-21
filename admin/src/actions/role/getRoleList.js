/**
 * 获取角色列表
 */
import { GET_ROLE_LIST } from '../../constants/role';

export function getRoleList(condition) {
    return {
        type: GET_ROLE_LIST,
        condition
    }
}
