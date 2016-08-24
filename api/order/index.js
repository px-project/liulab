/**
 * 订单控制器
 */
const express = require('express');
const _router = express.Router();
const orderModelActions = require('./actions');
const xres = require('../common/xres');


// 订单列表/详情
_router.get('/:order_id?', (req, res) => {
    let {order_id} = req.params;
    if (!order_id) {
        // list
        orderModelActions.list({}, (result) => {
            let resData = result;

            res.json(xres({ CODE: 0 }, resData));
        });
    } else {
        // detail
        orderModelActions.detail(order_id, {}, (result) => {
            let resData = result;

            res.json(xres({ CODE: 0 }, resData));
        });
    }
});

// 创建订单
_router.post('/', (req, res) => {
    let {agent_id, product_id, num, user_id} = req.body;

});

// 更新订单状态
_router.patch('/', (req, res) => {

});

// 删除订单
_router.delete('/', (req, res) => {

});

module.exports = _router;