/**
 * 订单模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    create_user: { type: Schema.Types.ObjectId, ref: 'User' },          // 下单用户
    order_id: { type: String },                                         // 订单号
    products: {}                                                        // 产品
};
