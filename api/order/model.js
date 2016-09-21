/**
 * 订单模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');

const OrderSchema = new Schema({
    user_id: Schema.Types.ObjectId, // 用户ID
    order_id: {
        type: String
    },
    products: [],
    create_time: { // 创建时间
        type: Date,
        default: Date.now
    },
    isDeleted: { // 软删除
        type: Boolean,
        default: false
    }
});

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;
