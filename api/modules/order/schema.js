/**
 * 订单模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    create_user: { type: Schema.Types.ObjectId, ref: 'User' },              // 下单用户
    order_id: { type: String },                                             // 订单号
    order_type: { type: String, default: 'order' },                           // 订单类型  order   child_order
    category: { type: Schema.Types.ObjectId, ref: 'Category' },               // 子订单品类
    children_order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],          // 子订单
    status: { type: String, default: 'pending' },                             // 子订单状态
    progress: [{ status: { type: String, default: 'pending' }, time: { type: Date, default: Date.now } }],    // 子订单进度
    product: {}                                                             // 产品数据
};
