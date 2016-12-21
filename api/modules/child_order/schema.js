/**
 * 子订单模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    order_id: { type: String },                                               // 子订单号
    create_user: { type: Schema.Types.ObjectId, ref: 'User' },                // 下单用户
    status: { type: String, default: 'pending' },                             // 子订单状态
    progress: [                                                               // 子订单进度
        {
            status: { type: String, default: 'pending' },
            time: { type: Date, default: Date.now },
            user: {type: Schema.Types.ObjectId, ref: 'User'},
            desc: {type: String, default: ''}
        }
    ],
    product: {}                                                               // 产品数据
};
