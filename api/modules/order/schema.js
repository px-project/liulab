/**
 * 订单模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    order_id: { type: String },                                      // 订单号
    create_user: { type: Schema.Types.ObjectId, ref: 'User' },       // 下单用户
    description: {type: String, default: ''},                        // 订单备注
    child_orders: [                                                  // 子订单
        { type: Schema.Types.ObjectId, ref: 'Child_order' }
    ]
};