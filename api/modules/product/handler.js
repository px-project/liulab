/**
 * 产品处理器
 */
const productModel = require('../../common/xmodel')('product');
const categoryHandlers = require('../category/handler');
const utils = require('../../common/utils');
const _ = require('lodash');
const productSchema = require('./schema');

/**
 * 产品列表
 * 
 * @param conditions {Object}
 */
exports.list = conditions => productModel.list(conditions);


/**
 * 产品详情
 * 
 * @param _id {String}
 * 
 */
exports.detail = _id => productModel.detail(_.mergeWith(conditions, { populateKeys: 'category' }));


/**
 * 创建产品
 * 
 * @desc 
 * 
 * @param newData {Object}
 */
exports.create = newData => {
    let filterFields = ['name', 'unit_price', 'category', 'attrs'];

    // 1. 通过hash check是否已存在
    let _newData = Object.assign({}, Object.keys().filter(key => key in filterFields).map(key => ({ [key]: newData[key] })));
    let hash = _newData.hash = utils.hash(_newData);

    return productModel.list({ hash }).then(result => {
        // 2. 如果存在直接更新
        if (result.length) return exports.update(result._id, _newData);

        // 3. 不存在则创建
        return categoryHandlers.detail(_newData.category)
            .then(category => categoryHandlers.code(category._id))
            .then(count => productModel.create(_newData));

    });

};


/**
 * 更新产品
 * 
 * @param _id {String}
 * @param newData {Object}
 * 
 */
exports.update = (_id, newData) => {
    delete newData.category;
    productModel.update(_id, newData);
};