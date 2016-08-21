/**
 * 请求用户列表
 */
import fetch from 'isomorphic-fetch';
import { getUserList, receiveUserList } from './index';
import apiConfig from '../../config/api.json';


export function fetchUserList(condition = {}) {
    return function(dispatch) {

        dispatch(getUserList(condition));

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
