/**
 * 订单控制器
 */
const _router = require('express').Router();
const orderModel = require('../common/xmodel')('order');
const productModel = require('../common/xmodel')('product');
const templateModel = require('../common/xmodel')('template');
const xres = require('../common/xres');
const async = require('async');
const fs = require('fs');
const path = require('path');
const xfilter = require('../common/xfilter');
const utils = require('../common/utils');

const statusArr = ['pending', 'pended', 'failed', 'processing', 'success', 'cancel'];

module.exports = _router

    // 批量下载订单
    .get('/download', (req, res) => {
        let orders = req.query.order_id;

        if (typeof orders === 'string') orders = [orders];

        let queue = [];

        orders.map((order_id) => queue.push((cb) => orderModel.detail(order_id, {}, (result) => cb(null, result))));

        async.series(queue, (err, result) => {
            let excelData = result.map((order, order_index) => {

            });
        });
    })


    // 订单列表
    .get('/', (req, res) => {
        orderModel.list({populateKeys: ['user_id']}, (result) => {
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

                order.create_user = order.user_id.name || order.user_id.username; 
            });


            res.json(xres({ code: 0 }, xfilter(result, '_id', 'order_id', 'create_user', 'total', 'create_time', 'update_time')));
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

            // init product
            let templateQueue = [];
            for (let template_id in newData.products) {
                templateQueue.push((cb) => templateModel.detail(template_id, {}, (result) => cb(null, result)));
            }

            async.series(templateQueue, (err, result) => {
                // 获取模板详情列表
                let templates = {};
                result.forEach((item) => templates[item._id] = item.template.map((field) => field.key));

                // 转换产品列表数据
                let products = [];
                let hashs = {};
                for (let template_id in templates) {

                    newData.products[template_id].forEach((rowData) => {
                        let product = { template_id, user_id: newData.user_id, hash: '', data: {} };

                        templates[template_id].forEach((key) => {
                            product.data[key] = rowData[key];
                        });

                        product.hash = utils.hash(JSON.stringify(product.data));
                        hashs[product.hash] = false;
                        products.push(product);
                    });

                }

                // 筛选重复数据
                products = products.filter((product) => {
                    if (!hashs[product.hash]) {
                        return hashs[product.hash] = true;
                    } else {
                        return false;
                    }
                });

                // 保存数据
                let productQueue = products.map((product) => (cb) => {
                    productModel.upsert({ template_id: product.template_id, hash: product.hash }, product, (result) => {
                        cb(null, result);
                    });
                });

                async.series(productQueue, (err, result) => { });
            });
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

        orderModel.list({ order_id }, (orders) => {
            let order = orders[0];
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


function createProduct(user_id, template_id, data, cb) {
    let hash = utils.hash(JSON.stringify(data));
    productModel.list({ template_id, hash }, (products) => {
        if (!products.length) {
            productModel.create({ user_id, template_id, hash, data }, (result) => {
                cb(result);
            });
        } else {
            cb(false);
        }
    });
}