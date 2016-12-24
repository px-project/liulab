/**
 * 产品模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    category: {                              // 品类
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: String,                            // 产品名称
    code: String,                            // 编号
    unit_price: Number,                      // 单价
    attrs: Object,                           // 产品属性
    hash: String                             // 属性hash
};