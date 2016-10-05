/**
 * 构建响应JSON
 */

let codeMap = {
    6000: '未登录',
    6001: '该用户无此接口权限',
    6002: '密码错误',
    6003: '用户不存在',
    6004: '用户已存在'
};

module.exports = function (res, data) {
    let result = {};

    if (res.code === 0) {
        result.success = true;
        result.result = data;
    } else {
        result.success = false;
        result.error = {
            code: res.code,
            message: codeMap[res.code]
        };
    }

    return result;

};
