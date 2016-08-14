/**
 * 订单控制器
 */
const express = require('express');
const _router = express.Router();
const orderModel = require('./model');

// 订单列表/详情
_router.get('/:order_id?', (req, res) => {
    // let {order_id} = req.params;
    // if (!order_id) {
    //     // list

    //     orderModel.list({}, (err, result) => {
    //         if (err) throw err;

    //         let resData = result.map((item) => {
    //             return {
    //                 _id: item._id,
    //             };
    //         });
    //     });

    // } else {
    //     // detail
    // }
});

// 创建订单
_router.post('/', (req, res) => {

});

// 更新订单状态
_router.patch('/', (req, res) => {

});

// 删除订单
_router.delete('/', (req, res) => {

});

module.exports = _router;