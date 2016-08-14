/**
 * 工具类
 */
const crypto = require('crypto');

exports.md5 = (tarStr) => {
    return crypto.createHash('md5').update(tarStr).digest('hex');
};