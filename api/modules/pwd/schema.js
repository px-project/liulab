/**
 * 用户密码表结构
 */
const mongoose = require('mongoose');

module.exports = {

    // 用户id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // 登录密码
    password: {
        type: String,
        required: true,
    },

};