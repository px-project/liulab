/**
 * 接受用户列表数据action
 */
import { RECEIVE_USER_LIST } from '../../constants/user';

export function receiveUserList(conditions, result) {
    return {
        type: RECEIVE_USER_LIST,
        conditions,
        result,
        receiveAt: Date.now()
    };
}
