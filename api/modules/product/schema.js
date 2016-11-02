/**
 * 产品模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    category: {                             // 品类
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    hash: String,                           // 数据hash
    create_user: {                          // 创建用户
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,                            // 产品名称
    unit_price: Number,                      // 单价 
    code: String,                            // 货号
    attrs: Object                            // 产品属性
};
