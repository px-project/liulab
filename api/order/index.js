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
                    order.products[template_id].forEach((item) => {
                        console.log(item)
                        let meta = item[item.length - 1];
                        let progress = meta.progress;
                        total[progress[progress.length - 1].status]++;
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
        orderModel.list({order_id}, (result) => {
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
                rowData.push({
                    product_id: newData.order_id + '_' + template_id + '_' + row,
                    progress: [
                        {
                            status: 'pending',
                            time: d
                        }
                    ]
                });

            });
        }

        orderModel.create(newData, (result) => {
            console.log(result);
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
        let {newStatus, product_id} = req.body;

        let sheetIndex = Number(product_id.split('_')[1]);
        let dataIndex = Number(product_id.split('_')[2]);

        orderModel.detail(order_id, {}, (result) => {

            let currentProduct = result.products[sheetIndex].data[dataIndex];
            let status = currentProduct.progress[currentProduct.progress.length - 1].status;

            newStatusIndex = statusArr.indexOf(newStatus);
            statusIndex = statusArr.indexOf(status);

            if (statusIndex == 0 && (newStatusIndex == 1 || newStatusIndex == 2)) {
                // 审核
                genProgress();
            } else if (statusIndex === 1 && newStatusIndex === 3) {
                // 订货
                genProgress();
            } else if (statusIndex === 3 && newStatusIndex === 4) {
                // 到货
                genProgress();
            } else {
                res.json({ error: '当前状态错误' });
            }

            orderModel.update(order_id, { products: result.products }, (_result) => {
                res.json(xres({ code: 0 }, result));
            });

            function genProgress() {
                currentProduct.progress.push({
                    status: newStatus,
                    time: new Date()
                });
            }
        });
    });

