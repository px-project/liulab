/**
 * 产品模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    template_id: {     // 模板id
        type: Schema.Types.ObjectId,
        ref: 'Template'
    },
    hash: String,                           // 数据hash
    user_id:{                               // 创建用户
         type: Schema.Types.ObjectId,
         ref: 'User'
    },
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
