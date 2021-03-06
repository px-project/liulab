/**
 * 角色模型
 */
const mongoose = require('mongoose');

module.exports = {

    // 角色名称
    name: {
        type: String,
        required: true,
        unique: true
    },

    // 角色描述
    description: {
        type: String,
        default: ''
    },

    // 权限
    permissions: [
        {
            code: String,
            name: String
        }
    ],

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