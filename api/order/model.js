/**
 * 订单模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');

const OrderSchema = new Schema({
    _id: String,                // 订单号
    user_id: Schema.Types.ObjectId, // 用户ID
    products: [
        {
            product_id: Schema.Types.ObjectId,  // 产品ID
            price: Number,              // 价格
            agent_id: Schema.Types.ObjectId     // 代理商ID
        }
    ],
    status: String,             // 订单状态
    create_time: {              // 创建时间
        type: Date,
        default: Date.now
    },
    update_time: {              // 更新时间
        type: Date,
        default: Date.now
    },
    isDeleted: {                // 软删除
        type: Boolean,
        default: false
    }
});

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;