/**
 * 产品模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    template_id: Schema.Types.ObjectId,     // 模板id
    hash: String,                           // 数据hash
    user_id: Schema.Types.ObjectId,         // 创建用户
    data: Object,                           // 产品数据
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
};
