/**
 * 获取用户列表数据action
 */
import { GET_USER_LIST } from '../../constants/user';

export function getUserList(conditions) {
    return {
        type: GET_USER_LIST,
        conditions
    };
}
