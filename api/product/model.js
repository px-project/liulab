/**
 * 产品模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');
const AgentModel = require('../agent/model');

const ProductSchema = new Schema({
    code: String, // 货号
    name: String, // 名称
    vender: String, // 厂家
    specification: String, // 规格
    agent: String, // 代理商
    phone: String, // 联系电话
    address: String, // 地址
    linkman: String, // 联系人
    price: Number, // 价格
    order: { type: String, ref: 'order' }, // 订单
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

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;
