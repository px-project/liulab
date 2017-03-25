/**
 * 角色模块状态
 */
import { ROLE_CHANGE_STATUS } from '../constants';

export function roleStatusReducer(status = 'view', action) {
    if (action.type === ROLE_CHANGE_STATUS) status = action.status;
    return status;
};