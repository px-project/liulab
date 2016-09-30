/**
 * 模板模型
 */
module.exports = {
    name: String,           // 产品类型
    template: Object,       // 产品模板
    create_time: {          // 创建时间
        type: Date,
        default: Date.now
    },
    update_time: {          // 更新时间
        type: Date,
        default: Date.now
    },
    isDeleted: {            // 软删除
        type: Boolean,
        default: false
    }
};