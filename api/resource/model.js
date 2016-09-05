/**
 * 资源模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');

const resourceSchema = new Schema({
    data: Object,
    type: String,
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

const ResourceModel = mongoose.model('resource', resourceSchema);

module.exports = ResourceModel;
