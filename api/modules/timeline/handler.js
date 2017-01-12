/**
 * 时间轴处理器
 */
const timelineModel = require('../../common/xmodel')('timeline');
const _ = require('lodash');

/**
 * 时间轴列表
 * 
 * @param condition {Object}
 */
exports.list = conditions => timelineModel.list(_.mergeWith(conditions, { populateKeys: 'user', filter: ['user.password'] }));


/**
 * 时间轴详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => timelineModel.detail(_id, { populateKeys: 'user' });


/**
 * 创建时间轴
 * 
 * @param newData {Object}
 */
exports.create = newData => timelineModel.create(newData);
