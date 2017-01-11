/**
 * 用户处理器
 */
const userModel = require('../../common/xmodel')('user');
const _ = require('lodash');
const utils = require('../../common/utils');
const config = require('../../config/index.json');

/**
 * 用户列表
 * 
 * @param condition {Object}
 */
exports.list = conditions => userModel.list(conditions);


/**
 * 用户详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => userModel.detail(_id, { populateKeys: 'role' });


/**
 * 创建用户
 * 
 * @param newData {Object}
 */
exports.create = newData => userModel.create(newData);


/**
 * 更新用户
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => userModel.update(_id, newData);


/**
 * 删除用户
 * 
 * @param _id {String}
 * 
 */
exports.delete = _id => userModel.delete(_id);


/**
 * 用户密码校验
 * 
 * @param username {String}
 * @param password {String}
 * 
 */
exports.check = (username, password) => {
    return userModel.list({ where: { username } })
        .then(result => {
            if (!result.length) return Promise.reject(4100);
            if (result[0].password !== utils.md5(config.pwd_sec + password)) return Promise.reject(4200);
            delete result[0].password;
            return result[0];
        });
}