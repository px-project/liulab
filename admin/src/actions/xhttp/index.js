/**
 * 网络请求封装action
 */
import apiConfig from '../../config/api.json';
import * as consts from '../../constants/';

// 发送请求
function gettingFetchData(action, api, params, condition) {
    return {
        type: consts.XHTTP_BEGIN,
        action,
        api,
        params,
        condition
    };
}


// 接受响应
function receiveFetchData(action, api, params, condition, reload, result) {
    return {
        type: consts.XHTTP_RECEIVE,
        action,
        api,
        params,
        condition,
        reload,
        result,
        receiveAt: Date.now()
    };
}

// 系统错误
function netErr (err) {}

// 处理URL
function handleUrl(api, params, conditions) {
    let url = apiConfig.server + apiConfig[api];

    // id字段的正则表达式
    let idRegG = /\{[a-zA-Z0-9_]+\}/g;
    let idRegI = /\{[a-zA-Z0-9_]+\}/i;

    // check个数是否对应
    let urlIdArr = url.match(idRegG) || [];
    if (urlIdArr.length !== params.length && urlIdArr.length !== params.length - 1) {
        throw new Error('传入的参数与api不匹配。');
    }

    // 替换url中的{}为具体id
    for (let i = 0, len = urlIdArr.length; i < len; i++) {
        url = url.replace(idRegI, params[i]);
    }

    // 详情
    if (urlIdArr.length === params.length - 1) url += `/${params[params.length - 1]}`;

    // 拼装查询
    var queryStr = '?';
    for (let key in conditions) {
        queryStr += `${key}=${conditions[key]}&`;
    }
    if (queryStr.length > 1) url += queryStr.substr(0, queryStr.length - 1);

    return url;
}

export function xhttp(action = '', api = '', params = [], conditions = {}, reload = false) {
    let toggleMethod = {
        list: 'GET',
        detail: 'GET',
        create: 'POST',
        update: 'PATCH',
        delete: 'DELETE'
    };

    return function (dispatch) {
    
        dispatch(gettingFetchData);

        return fetch(handleUrl(api, params, conditions), { method: toggleMethod[action] })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveFetchData(action, api, params, conditions, reload, json.result));
                } else {

                }
            });
    }
}
