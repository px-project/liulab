/**
 * 品类模型
 */
module.exports = {
    name: String,               // 品类名称
    photo: String,              // 品类图片
    description: String,        // 描述
    attrs: [                    // 品类属性
        { title: String, key: String, attr_type: String, attr_required: {type: Boolean, default: false} }
    ]
};