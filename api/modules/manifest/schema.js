/**
 * 货单模型
 */
const Schema = require('mongoose').Schema;

module.exports = {
    manifest_id: { type: String },                                            // 货单号
    order_id: { type: String },                                               // 订单号
    create_user: { type: Schema.Types.ObjectId, ref: 'User' },                // 下单用户
    status: { type: String, default: 'pending' },                             // 货单状态
    num: { type: Number },                                                    // 产品数量
    product: {},                                                              // 产品数据
    progress: [                                                               // 货单进度
        {
            status: { type: String, default: 'pending' },
            time: { type: Date, default: Date.now },
            user: { type: Schema.Types.ObjectId, ref: 'User' },
            desc: { type: String, default: '' }
        }
    ]
};
