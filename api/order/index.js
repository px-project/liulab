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


    // 订单列表/详情
    .get('/', (req, res) => {
        orderModel.list({}, (result) => {
            result.map((order, index) => {

                // init total
                let total = order.total = {};
                statusArr.forEach((status, index) => {
                    total[status] = 0;
                });

                let product_type = [];
                order.products.map((product_group) => {
                    // product_type array
                    product_type.push(product_group.product_type);

                    // handle total
                    product_group.data.map((product) => {
                        let progress = product.progress;
                        total[progress[progress.length - 1].status]++;
                    });
                });

                order.product_type = product_type;
            });


            res.json(xres({ code: 0 }, xfilter(result, '_id', 'order_id', 'user_id', 'total', 'product_type', 'create_time', 'update_time')));
        });
    })


    // 订单详情
    .get('/:order_id', (req ,res) => {
        let {order_id} = req.params;
        orderModel.detail(order_id, {}, (result) => {
            res.json(xres({code: 0}, xfilter(result, '_id', 'order_id', 'user_id', 'products', 'create_time', 'update_time')));
        });
    })


    // 创建订单
    .post('/', (req, res) => {
        let {products} = req.body;
        let d = new Date();
        let order_id = d.getFullYear() + '' + d.getMonth() + '' + d.getDate() + '';

        let newData = {
            order_id,
            user_id: req.session.user_id,
            products,
        };

        // 添加初始状态
        newData.products.map((sheet, index) => {

            sheet.data.map((data, _index) => {

                data.product_id = newData.order_id + '_' + index + '_' + _index;

                data.progress = data.progress || [];
                data.progress.push({
                    status: 'pending',
                    time: d
                });
            });
        });

        for (let sheetName in newData.products) {

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

