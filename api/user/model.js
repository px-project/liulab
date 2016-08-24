/**
 * 用户模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');

const UserSchema = new Schema({
    username: String,               // 登录账号
    password: String,               // 登录密码
    name: String,                   // 申请人
    phone: String,                  // 电话
    role: Schema.Types.ObjectId,    // 角色
    create_time: {                  // 创建事件
        type: Date,
        default: Date.now
    },
    isDeleted: {                    // 软删除
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;




