/**
 * 品类表结构
 */
const mongoose = require('mongoose');

module.exports = {

    // 名称
    name: {
        type: String,
        required: true,
        unique: true
    },

    // 描述
    description: {
        type: String,
        default: ''
    },

    // 缩写
    abbr: {
        type: String,
        required: true,
        unique: true,
        maxLength: 2
    },

    // 属性
    attrs: [
        {
            title: {
                type: String,
                required: true,
                unique: true
            },
            key: {
                type: String,
                required: true,
                unique: true
            },
            attr_type: {
                type: String,
                default: 'string'
            },
            attr_required: {
                type: Boolean,
                default: false
            }
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