/**
 * 角色处理器
 */
const roleModel = require('../../common/xmodel')('role');
const _ = require('lodash');

/**
 * 角色列表
 * 
 * @param condition {Object}
 */
exports.list = conditions => roleModel.list(_.mergeWith(conditions));


/**
 * 角色详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => roleModel.detail(_id, { populateKeys: 'permissions' });


/**
 * 创建角色
 * 
 * @param newData {Object}
 */
exports.create = newData => roleModel.create(newData);


/**
 * 更新角色
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => roleModel.update(_id, newData);

