/**
 * 订单表结构
 */
const mongoose = require('mongoose');

module.exports = {

    // 订单号
    order_id: {
        type: String,
        required: true,
        unique: true
    },

    // 下单用户
    create_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // 订单备注
    description: {
        type: String,
        default: ''
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