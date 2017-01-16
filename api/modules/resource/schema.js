/**
 * 资源表结构
 */
const mongoose = require('mongoose');
const resourceType = require('./constant').RESOURCE_TYPE;

module.exports = {

    // 资源对应实体id
    link_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manifest',
        required: true
    },

    // 资源对应实体类型字段
    link_type: {
        type: String,
        enum: {
            values: Object.keys(resourceType),
            message: `status must be one of ${Object.keys(resourceType).join(',')}.`
        },
    },

    // 资源名称
    file_name: {
        type: String,
        default: ''
    },

    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    }

};