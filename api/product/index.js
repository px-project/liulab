/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModel = require('../common/xmodel')('product');
const xres = require('../common/xres');
const async = require('async');
const xfilter = require('../common/xfilter');
const utils = require('../common/utils');


module.exports = _router
    // 获取产品列表
    .get('/', (req, res) => {
        productModel.list({populateKeys: ['user_id', 'template_id']}, (result) => {
            result.forEach((item) => {
                item.create_user = item.user_id.name || item.user_id.username;
                item.user_id = item.user_id._id;
            });

            res.json(xres({code: 0}, xfilter(result, '_id', 'template_id','user_id', 'create_user', 'data', 'create_time', 'update_time')));
        });
    })

    // 产品详情
    .get('/:product_id', (req, res) => {
        productModel.detail(req.params.product_id, {populateKeys: ['user_id']}, (result) => {
            result.create_user = result.user_id.name || item.user_id.username;
            result.user_id = result.user_id._id,
            res.json(xres({code: 0}, xfilter(result, '_id', 'template_id', 'user_id', 'create_user', 'data', 'create_time', 'update_time')));
        });
    })

    // 创建产品
    .post('/', (req, res) => {
        let newData = xfilter(req.body, 'template_id', 'data');
        newData.hash = utils.hash(JSON.stringify(newData.data));
        newData.user_id = req.session.user_id;

        productModel.create(newData, (result) => {
            res.json(xres({code: 0}, xfilter(result, '_id', 'create_time')));
        });
    })

    // 更新产品
    .post('/:product_id', (req, res) => {
        let newData = xfilter(req.body, 'data');
        newData.hash = utils.hash(JSON.stringify(newData.data));

        productModel.update(req.params.product_id, newData, (result) => {
            res.json(xres({code: 0}), xfilter(result, 'update_time'));
        });
    })

    // 删除产品
    .delete('/:product_id', (req, res) => {
        productModel.delete(req.params.product_id, (result) => {
            res.json(xres({code: 0}));
        });
    })


