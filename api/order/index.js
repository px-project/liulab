/**
 * 订单控制器
 */
const express = require('express');
const _router = express.Router();
const orderModelActions = require('./actions');
const xres = require('../common/xres');
const async = require('async');
const fs = require('fs');
const path = require('path');


// 订单列表/详情
_router.get('/:order_id?', (req, res) => {
    let { order_id } = req.params;
    if (!order_id) {
        // list
        orderModelActions.list({}, (result) => {
            res.json(xres({CODE: 0}, result));
        });
    } else {
        // detail
        orderModelActions.detail(order_id, {}, (result)=> {
            res.json(xres({CODE: 0}, result));
        });
    }
});


// 创建订单
_router.post('/', (req, res) => {
    let {products, filename} = req.body;
    let newData = {
        products
    };

    orderModelActions.create(newData, (result) => {
        if (filename) {
            // 删除文件
            fs.unlink(path.join(__dirname, '../uploads', filename), () => {
                res.json(xres({CODE: 0}, result));
            });
        }
    });
});


// 修改订单
_router.patch('/', (req, res) => {

});


module.exports = _router;
