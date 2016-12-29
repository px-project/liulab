/**
 * 子订单控制器
 */
const _router = require('express').Router();
const childOrderModel = require('../../common/xmodel')('child_order');
const xres = require('../../common/xres');


module.exports = _router

    // 批量下载子订单
    .get('/download', (req, res) => {

    })

    // 子订单列表
    .get('/', (req, res) => {
        childOrderModel.list({}, result => {
            res.json(xres({ code: 0 }, result));
        });
    })

    // 子订单详情
    .get('/:child_order_id', (req, res) => {

    })

    // 更新子订单
    .patch('/:child_order_id', (req, res) => {

    })