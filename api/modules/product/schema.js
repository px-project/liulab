/**
 * 产品表结构
 */
const mongoose = require('mongoose');

module.exports = {

    // 产品名称
    name: {
        type: String,
        required: true
    },

    // 产品编号
    code: {
        type: String,
        required: true,
        unique: true,
        maxlength: 2
    },

    // 产品单价
    unit_price: {
        type: Number,
        required: true,
        min: 0
    },

    // 产品类别
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    // 整个文档hash值
    hash: {
        type: String,
        required: true
    },

    // 产品属性
    attrs: {},

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
