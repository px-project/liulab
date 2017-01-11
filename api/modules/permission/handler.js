/**
 * 权限处理器
 */
const permissionModel = require('../../common/xmodel')('permission');
const _ = require('lodash');


/**
 * 权限列表
 * 
 * @param condition {Object}
 */
exports.list = condition => permissionModel.list(condition);


/**
 * 权限详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => permissionModel.detail(_id);


/**
 * 创建权限
 * 
 * @param newData {Object}
 */
exports.create = newData => permissionModel.create(newData);


/**
 * 更新权限
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => permissionModel.update(_id, newData);