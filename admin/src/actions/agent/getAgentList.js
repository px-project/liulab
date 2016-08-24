/**
 * 请求代理列表数据
 */
import fetch from 'isomorphic-fetch';
import {GETTING_AGENT_LIST, RECEIVE_AGENT_LIST} from '../../constants/';
import apiConfig from '../../config/api.json';

function gettingAgentList(condition) {
    return {
        type: GETTING_AGENT_LIST,
        condition
    };
}

function receiveAgentList(condition, result) {
    return {
        type: RECEIVE_AGENT_LIST,
        condition,
        result,
        receiveAt: Date.now()
    };
}

export function getAgentList(condition = {}) {
    return function(dispatch) {

        dispatch(gettingAgentList(condition));

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
