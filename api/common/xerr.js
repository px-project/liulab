/**
 * 错误处理封装
 */
const message = require('../config/').ERROR_MESSAGE;
module.exports = (code) => {
    return {
        code: code,
        message: message[code]
    };
};