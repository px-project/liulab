/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const utils = require('../../common/utils');
const productHandlers = require('./handler');
const _ = require('lodash');

module.exports = _router

    // 获取产品列表
    .get('/', (req, res) => {
        productHandlers.list(req.l_query)
            .then(result => res.json(result));
    })

    // 产品详情
    .get('/:product_id', (req, res) => {
        productHandlers.detail(req.params.product_id)
            .then(result => res.json(result));
    })

    // 创建产品
    .post('/', (req, res) => {
        productHandlers.create(req.body)
            .then(result => res.json(result));
    })

    // 更新产品
    .post('/:product_id', (req, res) => {
        productHandlers.update(req.params.product_id, req.body)
            .then(result => res.json(result));
    })

    // 删除产品
    .delete('/:product_id', (req, res) => {
        productHandlers.delete(req.params.product_id)
            .then(result => res.json(result));
    })


