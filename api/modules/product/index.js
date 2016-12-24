/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModel = require('../../common/xmodel')('product');
const xres = require('../../common/xres');
const async = require('async');
const xfilter = require('../../common/xfilter');
const utils = require('../../common/utils');


module.exports = _router
    // 获取产品列表
    .get('/', (req, res) => {
        productModel.list({ populateKeys: ['category'] }, (result) => {
            res.json(xres({ code: 0 }, result));
        });
    })

    // 产品详情
    .get('/:product_id', (req, res) => {
        productModel.detail(req.params.product_id, { populateKeys: ['category'] }, (result) => {
            res.json(xres({ code: 0 }, result));
        });
    })

    // 创建产品
    .post('/', (req, res) => {
        let newData = xfilter(req.body, 'category', 'data');
        newData.hash = utils.hash(JSON.stringify(newData.data));

        productModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'create_time')));
        });
    })

    // 更新产品
    .post('/:product_id', (req, res) => {
        let newData = xfilter(req.body, 'data');
        newData.hash = utils.hash(JSON.stringify(newData.data));

        productModel.update(req.params.product_id, newData, (result) => {
            res.json(xres({ code: 0 }), xfilter(result, 'update_time'));
        });
    })

    // 删除产品
    .delete('/:product_id', (req, res) => {
        productModel.delete(req.params.product_id, (result) => {
            res.json(xres({ code: 0 }));
        });
    })


