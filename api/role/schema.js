/**
 * 角色模型
 */
module.exports = {
    name: String,               // 名称
    permission: {},             // 权限
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
};



/**
 * permission example
 * 
 * 
 * member
 * {
 *      modules: {
 *          book: 
 *      }
 * 
 * }
 * 
 * 
 * 
 * 
 */