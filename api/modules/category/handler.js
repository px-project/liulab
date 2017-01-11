/**
 * 品类处理器
 */
const categoryModel = require('../../common/xmodel')('category');
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

