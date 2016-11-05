/**
 * 订单控制器
 */
const _router = require('express').Router();
const orderModel = require('../../common/xmodel')('order');
const productModel = require('../../common/xmodel')('product');
const categoryModel = require('../../common/xmodel')('category');
const xres = require('../../common/xres');
const async = require('async');
const fs = require('fs');
const path = require('path');
const xfilter = require('../../common/xfilter');
const utils = require('../../common/utils');

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
        orderModel.list({ populateKeys: ['user_id'] }, (result) => {
            result.map((order, index) => {

                // init total
                let total = order.total = {};
                statusArr.forEach((status, index) => {
                    total[status] = 0;
                });

                let product_type = [];

                for (let category_id in order.products) {
                    order.products[category_id].forEach((rowData, row) => {
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
        orderModel.list({ where: { order_id }, populateKeys: ['user_id'] }, (result) => {
            result[0].create_user = xfilter(result[0].user_id, '_id', 'name', 'username', 'phone');
            res.json(xres({ code: 0 }, xfilter(result[0], '_id', 'order_id', 'create_user', 'products', 'create_time', 'update_time')));
        });
    })


    // 创建订单
    .post('/', (req, res) => {
        let {order} = req.body;
        let products = utils.deepCopy(order);
        let now = new Date();
        let order_id = now.toISOString().replace(/[-T:Z\.]/g, '').substr(0, 14);

        // 添加子订单初始状态 
        Object.keys(products).forEach(category_id => {

            // 位子订单添加进度和token
            products[category_id].forEach((childOrder, childOrderIndex) => {
                childOrder.token = `${order_id}_${category_id}_${childOrderIndex}`;
                childOrder.progress = [{ status: 'pending', time: now }];
            });

            // 创建订单
            let newData = { order_id, create_user: req.session.user_id, products };
            orderModel.create(newData, orderData => {
                res.json(xres({ code: 0 }, orderData));

                // 创建产品 
            });
        });


        // orderModel.create(newData, (result) => {
        //     res.json(xres({ code: 0 }, result));

        //     // init product
        //     let categoryQueue = [];
        //     for (let category_id in newData.products) {
        //         categoryQueue.push((cb) => categoryModel.detail(category_id, {}, (result) => cb(null, result)));
        //     }

        //     async.series(categoryQueue, (err, result) => {
        //         // 获取模板详情列表
        //         let categories = {};
        //         result.forEach((item) => categories[item._id] = item.category.map((field) => field.key));

        //         // 转换产品列表数据
        //         let products = [];
        //         let hashs = {};
        //         for (let category_id in categories) {

        //             newData.products[category_id].forEach((rowData) => {
        //                 let product = { category_id, user_id: newData.user_id, hash: '', data: {} };

        //                 categories[category_id].forEach((key) => {
        //                     product.data[key] = rowData[key];
        //                 });

        //                 product.hash = utils.hash(JSON.stringify(product.data));
        //                 hashs[product.hash] = false;
        //                 products.push(product);
        //             });

        //         }

        //         // 筛选重复数据
        //         products = products.filter((product) => {
        //             if (!hashs[product.hash]) {
        //                 return hashs[product.hash] = true;
        //             } else {
        //                 return false;
        //             }
        //         });

        //         // 保存数据
        //         let productQueue = products.map((product) => (cb) => {
        //             productModel.upsert({ category_id: product.category_id, hash: product.hash }, product, (result) => {
        //                 cb(null, result);
        //             });
        //         });

        //         async.series(productQueue, (err, result) => { });
        //     });
        // });
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

        let category_id = token.split('_')[1];
        let rowIndex = parseInt(token.split('_')[2]);

        orderModel.list({ order_id }, (orders) => {
            let order = orders[0];
            let currentProduct = order.products[category_id][rowIndex];
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

// 创建产品
function createProduct(user_id, category_id, data, cb) {
    let hash = utils.hash(JSON.stringify(data));
    productModel.list({ category_id, hash }, (products) => {
        if (!products.length) {
            productModel.create({ user_id, category_id, hash, data }, (result) => {
                cb(result);
            });
        } else {
            cb(false);
        }
    });
}