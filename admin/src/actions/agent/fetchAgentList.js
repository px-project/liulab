/**
 * 请求代理列表数据
 */
import fetch from 'isomorphic-fetch';
import { getAgentList, receiveAgentList } from './index';
import apiConfig from '../../config/api.json';


export function fetchAgentList(condition = {}) {
    return function(dispatch) {

        dispatch(getAgentList(condition));

        return fetch(apiConfig.server + apiConfig.agent)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveAgentList(condition, json.result));
                } else {

                }
            });
    }
}
