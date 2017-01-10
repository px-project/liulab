/**
 * 用户表结构
 */
const mongoose = require('mongoose');

module.exports = {

    // 用户名
    username: {
        type: String,
        required: true,
        unique: true
    },

    // 登录密码
    password: {
        type: String,
        required: true,
    },

    // 头像路径 
    avatar: {
        type: String,
        default: ''
    },

    // 用户姓名
    name: {
        type: String,
        default: ''
    },

    // 联系电话
    phone: {
        type: String,
        default: ''
    },

    // 邮箱
    email: {
        type: String,
        default: ''
    },

    // 角色
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },

    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    },

    // 更新时间
    update_time: {
        type: Date,
        default: Date.now
    },

    // 软删除
    is_deleted: {
        type: Boolean,
        default: false
    }

};