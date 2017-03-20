/**
 * 网络请求封装action
 */
const downloadjs = require('downloadjs');
import { XHTTP_BEGIN, XHTTP_RECEIVE, XHTTP_ERROR, XHTTP_METHODS, XHTTP_API } from '../../constants/';
import { bindActionCreators } from 'redux';

// 处理错误
function handleError(code) {
    switch (code) {
        case 'USER_NOT_LOGIN':
            window.location = '/login.html';
    }
}

// 处理URL
export const url = (api, params, conditions) => {
    let url = window.server + XHTTP_API[api];

    // id字段的正则表达式
    let idRegG = /\{[a-zA-Z0-9_]+\}/g;
    let idRegI = /\{[a-zA-Z0-9_]+\}/i;

    // check个数是否对应
    let urlIdArr = url.match(idRegG) || [];
    // if (urlIdArr.length !== params.length && urlIdArr.length !== params.length - 1) {
    //     throw new Error('传入的参数与api不匹配。');
    // }

    // 替换url中的{}为具体id
    for (let i = 0, len = urlIdArr.length; i < len; i++) {
        url = url.replace(idRegI, params[i]);
        params.shift();
    }

    // 处理剩余参数
    if (params.length) url += '/' + params.join('/');

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
        type: XHTTP_BEGIN,
        options
    };
}


// 接受请求action
function receiveAction(options, result) {
    return {
        type: XHTTP_RECEIVE,
        options,
        result,
        receiveAt: Date.now()
    };
}


// 发生错误action
function errorAction() {

}

// 生成指定方法
const genXhttpMethod = method => (api = '', params = [], ...args) => {
    let options = {};

    // api, params, conditions, options
    if (XHTTP_METHODS[method] === 'GET') options = { method, api, params, conditions: args[0], options: args[1] };

    // api, params, newData, options
    if (XHTTP_METHODS[method] === 'POST') options = { method, api, params, newData: args[0], options: args[1] };

    // api, params, newData, option
    if (XHTTP_METHODS[method] === 'PATCH') options = { method, api, params, newData: args[0], options: args[1] };

    // api, params, options
    if (XHTTP_METHODS[method] === 'DELETE') options = { method, api, params, options: args[0] };

    return dispatch => {

        dispatch(beginAction(options));

        // fetch配置
        let fetchOption = {
            method: XHTTP_METHODS[method],
            headers: {
                'token': localStorage.getItem('token')
            }
        };

        // upload form data
        if (method === 'upload') {
            let reqData = fetchOption.body = new FormData();
            Object.keys(options.newData).map(key => reqData.append(key, options.newData[key]));
        }

        // post / patch
        if (method === 'create' || method === 'update') {
            fetchOption.headers['Accept'] = 'application/json';
            fetchOption.headers['Content-Type'] = 'application/json';
            fetchOption.body = JSON.stringify(options.newData);
        }

        let fetchRef = fetch(url(options.api, options.params, options.conditions), fetchOption).then(res => {
            if (res.status >= 400 && res.status < 500) return res.json().then(json => Promise.reject(json.code));
            if (res.status >= 500 && res.status < 600) return Promise.reject(res.status);
            return res;
        });

        if (method === 'download') {
            fetchRef = fetchRef.then(res => res.blob()).then(blob => downloadjs(blob, options.options.name));
        } else if (method === 'upload') {
            fetchRef = fetchRef.then(res => res.json());
        } else {
            fetchRef = fetchRef.then(res => res.json()).then(json => {
                dispatch(receiveAction(options, json));
                return json;
            });
        }

        return fetchRef.catch(code => handleError(code));

    };
}

// export const xhttp = Object.assign({
//     url: url
// }, ...Object.keys(XHTTP_METHODS).map(method => ({ [method]: genXhttpMethod(method) })));

export const xhttp = dispatch => bindActionCreators(
    Object.assign(
        { url: url },
        ...Object.keys(XHTTP_METHODS).map(method => ({ [method]: genXhttpMethod(method) }))
    ), dispatch);