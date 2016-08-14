/**
 * 代理模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');
const modelAction = require('../common/modelAction');

const agentSchema = new Schema({
    name: String,                           // 名称
    linkman: String,                        // 联系人
    phone: String,                          // 联系电话
    address: String,                        // 地址
    product: [                              // 产品
        {
            _id: Schema.Types.ObjectId,     // 产品ID
            price: Number                   // 产品价格
        }
    ],
    create_time: {                          // 创建时间
        type: Date,
        default: Date.now
    },
    update_time: {                          // 更新时间
        type: Date,
        default: Date.now
    },
    isDeleted: {                            // 软删除
        type: Boolean,
        default: false
    }
});

const agentModel = mongoose.model('agent', agentSchema);

module.exports = modelAction(agentModel);