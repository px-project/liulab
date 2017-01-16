/**
 * 订单处理器
 */
const orderModel = require('../../common/xmodel')('order');
const manifestHandlers = require('../manifest/handler');
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
exports.create = newData => {
    let order_id = newData.order_id = new Date().toISOString().replace(/[-T:Z\.]/g, '').substr(0, 14);
    return orderModel.create(newData).then(order => {
        return Promise.all(newData.products.map((product, index) => {
            let newManifest = {
                create_user: newData.create_user,
                order_id,
                num: product.num,
                manifest_id: order_id + '-' + (index + 1),
                product,
                description: newData.description,
                status: 'created'
            };

            delete newManifest.product.num;

            return manifestHandlers.create(newManifest);
        })).then(manifests => {
            order.manifests = manifests;
            return order;
        });
    });
}


/**
 * 更新订单
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => orderModel.update(_id, newData);

