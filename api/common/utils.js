/**
 * 工具类
 */
const crypto = require('crypto');

exports.md5 = (tarStr) => {
    return crypto.createHash('md5').update(tarStr).digest('hex');
};

exports.toCancel = (big, ...strs) => {
    let result = strs.map((str) => str.charAt(0).toUpperCase() + str.substr(1)).join('');
    return big ? result : (result.charAt(0).toLowerCase() + result.substr(1));
}