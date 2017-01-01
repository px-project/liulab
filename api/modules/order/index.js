/**
 * 订单控制器
 */
const _router = require('express').Router();
const orderModel = require('../../common/xmodel')('order');
const manifestModel = require('../../common/xmodel')('manifest');
const productModel = require('../../common/xmodel')('product');
const xres = require('../../common/xres');
const async = require('async');
const fs = require('fs');
const path = require('path');
const xfilter = require('../../common/xfilter');
const utils = require('../../common/utils');
const orderStatus = require('../../constants/order').ORDER_STATUS;
const _ = require('lodash');

module.exports = _router

    // 批量下载订单
    .get('/download', (req, res) => {

    })

    // 获取订单列表
    .get('/', (req, res) => {
        orderModel.list({ populateKeys: ['create_user'] }, orders => {
            let manifestQueue = orders.map(order => cb => {
                order._doc.create_user = order.create_user.name || order.create_user.username;
                manifestModel.list({ where: { order_id: order.order_id } }, (result = []) => cb(null, result));
            });
            async.series(manifestQueue, (err, manifests) => {
                orders.forEach((order, order_index) => {
                    order._doc.manifests = manifests[order_index];
                });
                res.json(xres({ code: 0 }, orders));
            });
        });
    })

    // 获取订单详情
    .get('/:order_id', (req, res) => {
    })

    /**
     * 创建订单 [POST] /order
     * 
     * body {
     *     description   {string}     订单备注
     *     products      {Array}      产品数据
     * }
     * 
     * products {
     *      name,
     *      code,
     *      category_id,
     *      unit_price,
     *      num,
     *      attrs: []
     * }
     */
    .post('/', (req, res) => {
        let {description, products} = req.body;

        let now = new Date();
        let order_id = now.toISOString().replace(/[-T:Z\.]/g, '').substr(0, 14);

        let create_user = req.session.user_id;

        let newOrderData = {
            order_id,
            create_user,
            description,
            create_time: now,
            update_time: now
        };

        // 创建货单
        let createManifestQueue = products.map((product, product_index) => cb => {
            let newManifest = {
                order_id,
                manifest_id: order_id + '-' + (product_index + 1),
                create_user,
                status: 'pending',
                progress: [{ status: 'pending', time: now, user: create_user, description }],
                num: product.num,
                product: Object.assign({}, ...Object.keys(product).filter(key => key !== 'num').map(key => ({ [key]: product[key] })))
            };
            manifestModel.create(newManifest, result => cb(null, result));
        });
        async.series(createManifestQueue, (err, manifests) => {
            // 创建订单
            orderModel.create(newOrderData, order => {
                order._doc.manifests = manifests;
                res.json(xres({ code: 0 }, order));

                // 创建产品
                let createProductQueue = manifests.map((manifest, manifest_index) => cb => {
                    productModel.list({ where: { code: manifest.product.code } }, result => {
                        let newProductData = manifest.product;

                        newProductData.hash = utils.hash(JSON.stringify(newProductData));

                        // 不存在：创建
                        if (!result.length) return productModel.create(newProductData, result => cb(null, result));

                        // 已存在
                        if (result[0].hash === newProductData.hash) return;

                        productModel.update(result[0]._id, newProductData, result => cb(null, result));
                    });
                });
                async.series(createProductQueue);
            });
        });
    })


    // 更新订单
    .patch('/:order_id', (req, res) => {
        let {status, description, } = req.body;
    })




//     // 批量下载订单
//     .get('/download', (req, res) => {
//         let orders = req.query.order_id;

//         if (typeof orders === 'string') orders = [orders];

//         let queue = orders.map((order_id) => cb => orderModel.detail(order_id, {}, (result) => cb(null, result)));

//         async.series(queue, (err, result) => {
//             let excelData = result.map((order, order_index) => {

//             });
//         });
//     })


//     // 修改订单
//     .patch('/:order_id', (req, res) => {
//         let {order_id} = req.params;
//         let newOrderData = req.body;

//         // 当前订单
//         orderModel.detail(order_id, {}, (result) => {

//         });
//     })


//     // 修改状态
//     .patch('/:order_id/status', (req, res) => {
//         let {order_id} = req.params;
//         let {status, token} = req.body;

//         let category_id = token.split('_')[1];
//         let rowIndex = parseInt(token.split('_')[2]);

//         orderModel.list({ order_id }, (orders) => {
//             let order = orders[0];
//             let currentProduct = order.products[category_id][rowIndex];
//             let currentStatus = currentProduct.progress[currentProduct.progress.length - 1].status;

//             let currentStatusIndex = statusArr.indexOf(currentStatus);
//             let newStatusIndex = statusArr.indexOf(status);

//             if (currentStatusIndex == 0 && (newStatusIndex == 1 || newStatusIndex == 2)) {
//                 // 审核
//                 genProgress(status);
//             } else if (currentStatusIndex === 1 && newStatusIndex === 3) {
//                 // 订货
//                 genProgress(status);
//             } else if (currentStatusIndex === 3 && newStatusIndex === 4) {
//                 // 到货
//                 genProgress(status);
//             } else {
//                 res.json({ error: '当前状态错误' });
//             }

//             orderModel.update(order._id, { products: order.products }, (_result) => {

//                 // 重新获取create_user
//                 orderModel.detail(order._id, { populateKeys: ['create_user'] }, result => {
//                     res.json(xres({ code: 0 }, result));
//                 });
//             });

//             function genProgress(status) {
//                 currentProduct.progress.push({
//                     status,
//                     time: new Date()
//                 });
//             }
//         });
//     });