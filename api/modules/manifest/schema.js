/**
 * 货单表结构
 */
const mongoose = require('mongoose');

module.exports = {

    // 货单号
    manifest_id: {
        type: String,
        required: true,
        unique: true
    },

    // 订单号
    order_id: {
        type: String,
        required: true
    },

    // 下单用户
    create_user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'User'
    },

    // 产品数量
    num: {
        type: Number,
        required: true,
        min: 0
    },

    // 货单状态
    status: {
        type: string,
        enum: {
            values: Object.keys(manifestStatus),
            message: `status must be one of ${Object.keys(manifestStatus).join(',')}.`
        },
        required: true
    },

    // 货单产品数据
    product: {},

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