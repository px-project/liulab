/**
 * 订单模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    user_id: Schema.Types.ObjectId, // 用户ID
    order_id: {
        type: String
    },
    products: {},
    create_time: { // 创建时间
        type: Date,
        default: Date.now
    },
    isDeleted: { // 软删除
        type: Boolean,
        default: false
    }
};
