/**
 * 构建响应JSON
 */

module.exports = function (code, data) {
    let result = {};

    if (code.CODE === 0) {
        result.success = true;
        result.result = data;
    } else {
        console.log(code);
    }

    return result;

};