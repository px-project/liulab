/**
 * 订单模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    user_id: {          // 用户ID
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order_id: {         // 订单号
        type: String
    },
    products: {},       // 产品
    create_time: {      // 创建时间
        type: Date,
        default: Date.now
    },
    isDeleted: {        // 软删除
        type: Boolean,
        default: false
    }
};
