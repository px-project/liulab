/**
 * 权限表结构
 */

module.exports = {

    // 权限名称
    name: {
        type: String,
        required: true,
        unique: true
    },

    // 权限代码
    code: {
        type: String,
        required: true,
        unique: true
    },

    // 权限描述
    description: {
        type: String,
        default: ''
    },

    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    },

    // 更新时间
    update_time: {
        type: Date,
        default: Date.now
    },

    // 软删除
    is_deleted: {
        type: Boolean,
        default: false
    }

};