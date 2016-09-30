/**
 * 角色模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../common/db');

const RoleSchema = new Schema({
    name: String,               // 名称
    permission: String,         // 权限
    create_time: {              // 创建时间
        type: Date,
        default: Date.now
    },
    update_time: {              // 更新时间
        type: Date,
        default: Date.now
    },
    isDeleted: {                // 软删除
        type: Boolean,
        default: false
    }
});

const RoleModel = mongoose.model('role', RoleSchema);

module.exports = RoleModel;