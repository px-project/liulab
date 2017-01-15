/**
 * 工具类
 */
const crypto = require('crypto');
const path = require('path');

// md5 加密
exports.md5 = (tarStr) => {
    return crypto.createHash('md5').update(tarStr).digest('hex');
};

// 转hash
exports.hash = (tarStr) => {
    return crypto.createHash('sha1').update(tarStr).digest('hex');
};


/**
 * 转大驼峰
 */
exports.toBigCamel = (...strs) => {
    return strs.map(str => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()).join('');
};

/**
 * 转小驼峰
 */
exports.toSmallCamel = (...strs) => {
    let bigCancel = exports.toBigCamel(...str);
    return bigCancel.charAt(0).toLowerCase() + bigCancel.substr(1);
};
