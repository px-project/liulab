/**
 * 订单模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');

const OrderSchema = new Schema({
    _id: {          // 订单号
        type: String,
        default: new Date().getTime().toString()
    },
    user_id: Schema.Types.ObjectId, // 用户ID
    // products: [{ type: String, ref: 'product' }],   // 产品列表
    products: [ // 产品列表数据

    ],
    status: { // 订单状态：pending(待审核)  pended(已审核) processing(订货中)  successed(订货成功) failed(取消订单)
        type: String,
        default: 'pending'
    },
    create_time: { // 创建时间
        type: Date,
        default: Date.now
    },
    update_time: { // 更新时间
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
