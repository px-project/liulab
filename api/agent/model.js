/**
 * 代理模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');
const ProductModel = require('../product/model');

const agentSchema = new Schema({
    name: String, // 名称
    linkman: String, // 联系人
    phone: String, // 联系电话
    address: String, // 地址
    products: [ // 产品列表
        {
            product: {
                type: String,
                ref: 'product'
            },
            price: {
                type: Number,
                default: 0
            }
        }
    ],
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

const AgentModel = mongoose.model('agent', agentSchema);

module.exports = AgentModel;
