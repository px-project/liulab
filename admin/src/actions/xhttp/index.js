/**
 * 网络请求封装action
 */
import apiConfig from '../../config/api.json';
import * as consts from '../../constants/';

// 系统错误
function handleNetErr(err) {
    console.error(err);
}

// 业务逻辑错误
function handleBusinessErr(err) {
    switch (err.code) {
        case 6000:
            window.location.href = window.location.origin + '/login.html';
    }
}

// 处理URL
function handleUrl(api, params, conditions) {
    let url = window.server + apiConfig[api];

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

        if (Array.isArray(conditions[key])) {
            queryStr += conditions[key].map((item) => (`${key}=${item}&`)).join('');
        } else {
            queryStr += `${key}=${conditions[key]}&`;
        }

    }
    if (queryStr.length > 1) url += queryStr.substr(0, queryStr.length - 1);

    return url;
}


// 发送请求action
function beginAction(options) {
    return {
        type: consts.XHTTP_BEGIN,
        options
    };
}


// 接受请求action
function receiveAction(options, result) {
    return {
        type: consts.XHTTP_RECEIVE,
        options,
        result,
        receiveAt: Date.now()
    };
}


// 发生错误action
function errorAction() {

}

// 各action对应Http method
const toggleMethod = {
    list: 'GET',
    detail: 'GET',
    create: 'POST',
    update: 'PATCH',
    delete: 'DELETE'
};


// 生成指定方法
const genXhttpMethod = method => (api = '', params = [], ...args) => {
    let options = {};

    // xhttp.list(api, params, conditions, options)
    // xhttp.detail(api, params, conditions, options)
    if (method === 'list' || method === 'detail') options = { method, api, params, conditions: args[0], options: args[1] };

    // xhttp.create(api, params, newData, options)
    // xhttp.update(api, params, newData, options)
    if (method === 'create' || method === 'update') {
        options = { method, api, params, newData: args[0], options: args[1] };
    }

    // xhttp.delete(api, params, options)
    if (method === 'delete') options = { method, api, params, options: args[0] };



    return dispatch => {

        dispatch(beginAction(options));

        // fetch配置
        let fetchOption = {
            method: toggleMethod[method],
            headers: {},
            credentials: 'include'
        };

        // body
        if (toggleMethod[method] !== 'GET' && !!options.newData) {
            if (options.newData instanceof FormData) {
                // 表单
                fetchOption.body = options.newData;
            } else {
                // json
                fetchOption.headers['Accept'] = 'application/json';
                fetchOption.headers['Content-Type'] = 'application/json';
                fetchOption.body = JSON.stringify(options.newData);
            }
        }

        return fetch(handleUrl(options.api, options.params, options.conditions), fetchOption)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveAction(options, json.result));
                    // if (cb) cb(json.result);
                    return json;
                }
                else {
                    handleBusinessErr(json.error);
                }
            });
        // .catch(err => {
        // handleNetErr(err);
        // });
    };
}

export const xhttp = Object.assign({
    url: handleUrl
}, ...['list', 'detail', 'create', 'update', 'delete'].map(method => ({ [method]: genXhttpMethod(method) })));