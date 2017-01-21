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
exports.list = conditions => productModel.list(_.mergeWith(conditions, {populateKeys: 'category'}));


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

    let _newData = {};
    ['name', 'unit_price', 'category', 'attrs'].forEach(key => _newData[key] = newData[key]);
    _newData = _.cloneDeepWith(_newData);

    let hash = _newData.hash = utils.hash(JSON.stringify(_newData));

    _newData.code = 'asda111222';

    return productModel.create(_newData);
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