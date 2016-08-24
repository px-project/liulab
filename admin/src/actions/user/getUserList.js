/**
 * 请求用户列表数据
 */
import fetch from 'isomorphic-fetch';
import {GETTING_USER_LIST, RECEIVE_USER_LIST} from '../../constants/';
import apiConfig from '../../config/api.json';

function gettingUserList(condition) {
    return {
        type: GETTING_USER_LIST,
        condition
    };
}

function receiveUserList(condition, result) {
    return {
        type: RECEIVE_USER_LIST,
        condition,
        result,
        receiveAt: Date.now()
    };
}

export function getUserList(condition = {}) {
    return function(dispatch) {

        dispatch(gettingUserList(condition));

        return fetch(apiConfig.server + apiConfig.user)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveUserList(condition, json.result));
                } else {

                }
            });
    }
}
