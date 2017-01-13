/**
 * 品类处理器
 */
const categoryModel = require('../../common/xmodel')('category');
const productHandlers = require('../product/handler');
const _ = require('lodash');

/**
 * 品类列表
 * 
 * @param condition {Object}
 */
exports.list = conditions => categoryModel.list(conditions);


/**
 * 品类详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => categoryModel.detail(_id);


/**
 * 创建品类
 * 
 * @param newData {Object}
 */
exports.create = newData => categoryModel.create(newData);


/**
 * 更新品类
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => categoryModel.update(_id, newData);


/**
 * 当前品类最新编号
 * 
 */
exports.code = _id => productModel.model.count({ category: category._id }).then((count = 0) => {
    return new Promise.resolve(category.abbr + _.padStart((count + ''), 7 - (count + 1 + '').length, '0'));
});