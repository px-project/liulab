/**
 * 用户密码处理器
 */
const pwdModel = require('../../common/xmodel')('pwd');
const utils = require('../../common/utils');
const pwdSec = require('../../config/').PWD_SEC;

/**
 * 检验密码
 * 
 */
exports.check = (user_id, password) => {
    return pwdModel.list({ user: user_id }).then(result => {
        if (!result.length) return Promise.reject(4000);
        if (result[0].password !== utils.md5(pwdSec + password)) return Promise.reject(4100);
        return Promise.resolve(true);
    });
};


/**
 * 创建密码
 * 
 */
exports.create = (user_id, password) => pwdModel.create({ user: user_id, password: utils.md5(pwdSec + password) });


/**
 * 更新密码
 * 
 */
exports.update = (user_id, password) => {
    return pwdModel.list({ user: user_id }).then(result => {
        if (!result.length) return Promise.reject(4100);
        return pwdModel.update({ password: utils.md5(pwdSec + password) });
    });
};