/**
 * 请求角色列表数据
 */
import fetch from 'isomorphic-fetch';
import {GETTING_ROLE_LIST, RECEIVE_ROLE_LIST} from '../../constants/';
import apiConfig from '../../config/api.json';

function gettingRoleList(condition) {
    return {
        type: GETTING_ROLE_LIST,
        condition
    };
}

function receiveRoleList(condition, result) {
    return {
        type: RECEIVE_ROLE_LIST,
        condition,
        result,
        receiveAt: Date.now()
    };
}

export function getRoleList(condition = {}) {
    return function(dispatch) {

        dispatch(gettingRoleList(condition));

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
