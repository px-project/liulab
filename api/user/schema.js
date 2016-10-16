/**
 * 用户模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    username: String,                                       // 登录账号
    password: String,                                       // 登录密码
    name: String,                                           // 申请人
    phone: String,                                          // 电话
    role: { type: Schema.Types.ObjectId, ref: 'Role' },     // 角色
    create_time: { type: Date, default: Date.now },         // 创建时间
    update_time: { type: Date, default: Date.now },         // 更新时间
    isDeleted: { type: Boolean, default: false }            // 逻辑删除
};