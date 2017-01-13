/**
 * 用户处理器
 */
const userModel = require('../../common/xmodel')('user');
const pwdHandlers = require('../pwd/handler');
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
exports.update = (_id, newData) => userModel.update(_id, newData)
    .then(result => {
        if (newData.password) return pwdHandlers.update(_id, newData.password).then(pwd => result);
        return result;
    })


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
        .then(users => {
            if (!users.length) return Promise.reject(4100);

            let user = users[0];

            return pwdHandlers.check(user._id, password).then(result => new Promise(result));
        });
};