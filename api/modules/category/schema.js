/**
 * 品类模型
 */
module.exports = {
    name: String,           // 品类名称
    photo: String,          // 品类图片
    attrs: [                // 品类属性
        { title: String, field: String, type: String }
    ]
};