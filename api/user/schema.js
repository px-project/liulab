/**
 * 用户模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    username: String,               // 登录账号
    password: String,               // 登录密码
    name: String,                   // 申请人
    phone: String,                  // 电话
    role: Schema.Types.ObjectId,    // 角色
    create_time: {                  // 创建事件
        type: Date,
        default: Date.now
    },
    update_time: {
        type: Date,
        default: Date.now  
    },
    isDeleted: {                    // 软删除
        type: Boolean,
        default: false
    }
});