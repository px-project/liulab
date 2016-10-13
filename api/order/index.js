/**
 * 订单控制器
 */
const _router = require('express').Router();
const orderModel = require('../common/xmodel')('order');
const xres = require('../common/xres');
const async = require('async');
const fs = require('fs');
const path = require('path');
const xfilter = require('../common/xfilter');

const statusArr = ['pending', 'pended', 'failed', 'processing', 'success', 'cancel'];

module.exports = _router

    // 批量下载订单
    .get('/download', (req, res) => {
        let orders = req.query.order_id;

        if (typeof orders === 'string') orders = [orders];

        let queue = [];

        orders.map((order_id) => {
            queue.push((cb) => {
                orderModel.detail(order_id, {}, (result) => {
                    cb(null, result);
                });
            });
        });

        async.series(queue, (err, result) => {
            let excelData = result.map((order, order_index) => {

            });
        });
    })


    // 订单列表
    .get('/', (req, res) => {
        orderModel.list({}, (result) => {
            result.map((order, index) => {

                // init total
                let total = order.total = {};
                statusArr.forEach((status, index) => {
                    total[status] = 0;
                });

                let product_type = [];

                for (let template_id in order.products) {
                    order.products[template_id].forEach((rowData, row) => {
                        total[rowData.progress[rowData.progress.length - 1].status]++;
                    });
                }

                order.product_type = product_type;
            });


            res.json(xres({ code: 0 }, xfilter(result, '_id', 'order_id', 'user_id', 'total', 'create_time', 'update_time')));
        });
    })


    // 订单详情
    .get('/:order_id', (req, res) => {
        let {order_id} = req.params;
        orderModel.list({ order_id }, (result) => {
            res.json(xres({ code: 0 }, xfilter(result[0], '_id', 'order_id', 'user_id', 'products', 'create_time', 'update_time')));
        });
    })


    // 创建订单
    .post('/', (req, res) => {
        let {products} = req.body;
        let d = new Date();
        let order_id = new Date().toISOString().replace(/[-T:Z\.]/g, '').substr(0, 14);

        let newData = {
            order_id,
            user_id: req.session.user_id,
            products,
        };

        // 添加初始状态
        for (let template_id in newData.products) {

            newData.products[template_id].map((rowData, row) => {
                rowData.token = newData.order_id + '_' + template_id + '_' + row;
                rowData.progress = [{ status: 'pending', time: d }];
            });
        }

        orderModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, result));
        });
    })


    // 修改订单
    .patch('/:order_id', (req, res) => {
        let {order_id} = req.params;
        let newOrderData = req.body;


        // 当前订单
        orderModel.detail(order_id, {}, (result) => {

        });
    })


    // 修改状态
    .patch('/:order_id/status', (req, res) => {
        let {order_id} = req.params;
        let {status, token} = req.body;

        let template_id = token.split('_')[1];
        let rowIndex = parseInt(token.split('_')[2]);

        orderModel.list({order_id}, (orders) => {
            let order = orders[0];
            console.log(template_id)
            console.log(order.products)
            let currentProduct = order.products[template_id][rowIndex];
            let currentStatus = currentProduct.progress[currentProduct.progress.length - 1].status;

            let currentStatusIndex = statusArr.indexOf(currentStatus);
            let newStatusIndex = statusArr.indexOf(status);

            if (currentStatusIndex == 0 && (newStatusIndex == 1 || newStatusIndex == 2)) {
                // 审核
                genProgress(status);
            } else if (currentStatusIndex === 1 && newStatusIndex === 3) {
                // 订货
                genProgress(status);
            } else if (currentStatusIndex === 3 && newStatusIndex === 4) {
                // 到货
                genProgress(status);
            } else {
                res.json({ error: '当前状态错误' });
            }

            orderModel.update(order._id, { products: order.products }, (_result) => {
                res.json(xres({ code: 0 }, order));
            });

            function genProgress(status) {
                currentProduct.progress.push({
                    status,
                    time: new Date()
                });
            }
        });
    });

