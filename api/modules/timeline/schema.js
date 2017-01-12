/**
 * 时间轴表结构
 */
const mongoose = require('mongoose');
const manifestStatus = require('../manifest/constant').MANIFEST_STATUS;

module.exports = {

    // 时间轴对应状态
    status: {
        type: String,
        enum: {
            values: Object.keys(manifestStatus),
            message: `status must be one of ${Object.keys(manifestStatus).join(',')}.`
        },
        required: true
    },

    // 时间轴对应货单id
    link_id: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'Manifest',
        required: true
    },

    // 操作人
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'User',
        required: true
    },

    // 当前操作描述
    description: {
        type: String,
        default: ''
    },

    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    }

};