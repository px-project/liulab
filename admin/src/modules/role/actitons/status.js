/**
 * 角色界面状态
 */
import { ROLE_CHANGE_STATUS } from '../constants';

// 改变角色界面状态
const changeStatusAction = status => ({ type: ROLE_CHANGE_STATUS, status });

export const changeStatus = status => dispatch => dispatch(changeStatusAction(status));