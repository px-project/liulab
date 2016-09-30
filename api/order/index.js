/**
 * 订单控制器
 */
const _router = require('express').Router();
const orderModel = require('../common/xmodel')('order');
const xres = require('../common/xres');
const async = require('async');
const fs = require('fs');
const path = require('path');

module.exports = _router


    // 订单列表/详情
    .get('/:order_id?', (req, res) => {
        let { order_id } = req.params;
        if (!order_id) {
            // list
            orderModel.list({}, (result) => {
                res.json(xres({ code: 0 }, result));
            });
        } else {
            // detail
            orderModel.detail(order_id, {}, (result) => {
                res.json(xres({ code: 0 }, result));
            });
        }
    })


    // 创建订单
    .post('/', (req, res) => {
        let {products} = req.body;
        let d = new Date();
        let order_id = d.getFullYear() + ''
            + d.getMonth() + ''
            + d.getDate() + ''
            + d.getHours() + ''
            + d.getMinutes() + ''
            + d.getSeconds() + ''
            + d.getMilliseconds();

        // todo
        let user_id = '57c319dc640be57907fb3dd3';

        let newData = {
            order_id,
            user_id,
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

            let statusArr = ['pending', 'pended', 'failed', 'processing', 'success', 'cancel'];

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

