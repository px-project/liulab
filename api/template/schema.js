/**
 * 模板模型
 */
module.exports = {
    name: String,           // 产品类型
    user_id: String,        // 添加用户
    template: [],           // 产品模板
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



/**
 * 模板数据
 * [
 *      {title: '字段1', field: 'name', type: 'string'},
 *      {title: '字段2', field: 'age', type: 'name', value: [{}]
 * ]
 * 
 * 
 * {
 *      "name": {
 *          "name": ""
 *      }
 *  
 * }
 */
