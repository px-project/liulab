/**
 * 货单处理器
 */
const manifestModel = require('../../common/xmodel')('manifest');
const timelineHandlers = require('../timeline/handler');
const productHandlers = require('../product/handler');
const _ = require('lodash');

/**
 * 货单列表
 * 
 * @param condition {Object}
 */
exports.list = conditions => manifestModel.list(conditions);


/**
 * 货单详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => manifestModel.detail(_id, { populateKeys: 'create_user' });


/**
 * 创建货单
 * 
 * @param newData {Object}
 */
exports.create = newData => manifestModel.create(newData)
    .then(manifest => {
        let newTimeline = { link_id: manifest._id, user: newData.create_user, status: 'created', description: newData.description };
        return timelineHandlers.create(newTimeline)
            .then(timeline => productHandlers.create(newData.product))
            .then(product => _.mergeWith(manifest, { product }));
    });


/**
 * 更新货单
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => manifestModel.update(_id, newData)
    .then(result => timelineHandlers.create({ link_id: _id, user: newData.user, status: newData.status, description: newData.description }));

