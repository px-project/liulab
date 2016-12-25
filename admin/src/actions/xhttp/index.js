/**
 * 网络请求封装action
 */
import apiConfig from '../../config/api.json';
import * as consts from '../../constants/';

// 发送请求
function gettingFetchData(action, api, params, conditions) {
    return {
        type: consts.XHTTP_BEGIN,
        action,
        api,
        params,
        conditions
    };
}


// 接受响应
function receiveFetchData(options, result) {
    return {
        type: consts.XHTTP_RECEIVE,
        options,
        result,
        receiveAt: Date.now()
    };
}

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


/**
 * 发送网络请求相关方法
 *
 * @param options
 *       -- action: 请求方式：list(default) detail create update delete
 *       -- api:    接口url, 对照config key  必填
 *       -- params: 请求参数，对应config key  中的{:~~~}
 *       -- conditions: 查询条件
 *       -- reload： 是否覆盖store中原有数据
 *       -- data: body 部分
 */

// xhttp.list(api, params, conditions, reload, cb)
export function xhttp(options, cb) {
    let { action = 'list', api = '', params = [], conditions = {}, reload = false, data = {} } = options;

    // api必备
    if (!api) {
        console.log('api is not defined!');
        return;
    }


    // 各action对应Http method
    let toggleMethod = {
        list: 'GET',
        detail: 'GET',
        create: 'POST',
        update: 'PATCH',
        delete: 'DELETE'
    };

    return function (dispatch) {

        dispatch(gettingFetchData(action, api, params, conditions));

        // fetch配置
        let fetchOption = {
            method: toggleMethod[action],
            headers: {},
            credentials: 'include'
        };

        // body
        if (toggleMethod[action] !== 'GET' && !!data) {
            if (data instanceof FormData) {
                // 表单
                fetchOption.body = data;
            } else {
                // json
                fetchOption.headers['Accept'] = 'application/json';
                fetchOption.headers['Content-Type'] = 'application/json';
                fetchOption.body = JSON.stringify(data);
            }
        }

        options = { action, api, params, conditions, reload, data };

        return fetch(handleUrl(api, params, conditions), fetchOption)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveFetchData(options, json.result));
                    if (cb) cb(json.result);
                }
                else {
                    handleBusinessErr(json.error);
                }
            })
        // .catch(err => {
        // handleNetErr(err);
        // });
    }
}


// 生成指定方法
const genXhttpMethod = method => (api = '', params = [], ...args) => {
    let options = {};

    // xhttp.list(api, params, conditions, options)
    // xhttp.detail(api, params, conditions, options)
    if (method === 'list' || method === 'detail') options = {api, params, conditions: args[0], options: args[1]};

    // xhttp.create(api, params, newData, options)
    // xhttp.update(api, params, newData, options)
    if (method === 'create' || method === 'update') {
        options = {api, params, newData: args[0], options: args[1]};
    }

    // xhttp.delete(api, params, options)
    if  (method === 'delete') options = {api, params, options: args[0]};


    return dispatch => {

    };
}

export const newXhttp = Object.assign({}, ...['list', 'detail', 'create', 'update', 'delete'].map(method => ({[method]: genXhttpMethod(method)})));