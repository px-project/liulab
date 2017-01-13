/**
 * 订单处理器
 */
const orderModel = require('../../common/xmodel')('order');
const _ = require('lodash');

/**
 * 订单列表
 * 
 * @param condition {Object}
 */
exports.list = conditions => orderModel.list(_.mergeWith(conditions, { populateKeys: 'create_user' }));


/**
 * 订单详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => orderModel.detail(_id, { populateKeys: 'create_user' });


/**
 * 创建订单
 * 
 * @param newData {Object}
 */
exports.create = newData => orderModel.create(newData).then(result => {

});


/**
 * 更新订单
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => orderModel.update(_id, newData);

