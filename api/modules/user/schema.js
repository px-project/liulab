/**
 * 用户模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    username: String,                                       // 登录账号
    avatar: String,                                         // 头像
    password: String,                                       // 登录密码
    name: String,                                           // 申请人
    phone: String,                                          // 电话
    role: { type: Schema.Types.ObjectId, ref: 'Role' }      // 角色
};