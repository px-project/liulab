/**
 * 获取角色数据action
 */
import fetch from 'isomorphic-fetch';
import { getRoleList, receiveRoleList } from './index';
import apiConfig from '../../config/api.json';


export function fetchRoleList(condition = {}) {
    return function(dispatch) {

        dispatch(getRoleList(condition));

        return fetch(apiConfig.server + apiConfig.role)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveRoleList(condition, json.result));
                } else {

                }
            });
    }
}
