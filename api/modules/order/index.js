/**
 * 订单控制器
 */
const _router = require('express').Router();
const orderModel = require('../../common/xmodel')('order');
const childOrderModel = require('../../common/xmodel')('child_order');
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
        orderModel.list({ populateKeys: ['create_user', 'child_orders'] }, result => {
            result.forEach(order => {

                // 各状态子订单统计
                let total = order.total = Object.assign({}, ...orderStatus.map(status => ({ [status]: 0 })));

                order.child_orders.forEach(child_order => total[child_order.status]++);

                order._doc.create_user = order.create_user.name || order.create_user.username;
            });
            return res.json(xres({ code: 0 }, xfilter(result, '_id', 'order_id', 'create_user', 'total', 'create_time', 'update_time')));

        });
    })

    // 获取订单详情
    .get('/:order_id', (req, res) => {
        let {order_id} = req.params;
        orderModel.list({ where: { order_id }, populateKeys: ['child_orders', 'create_user'] }, orderList => {
            if (!orderList.length) return res.json(xres({ code: 404 }));
            orderList[0]._doc.create_user = orderList[0].create_user.name || orderList[0].create_user.username;
            res.json(xres({ code: 0 }, orderList[0]));
        });
    })

    /**
     * 创建订单 [POST] /order
     * 
     * body {
     *     description   {string}     订单备注
     *     child_orders  {Array}      子订单数据
     * }
     * 
     * child_orders {
     *      name,
     *      code,
     *      category_id,
     *      unit_price,
     *      num,
     *      attrs: []
     * }
     */
    .post('/', (req, res) => {
        let {description, child_orders} = req.body;

        let now = new Date();
        let order_id = now.toISOString().replace(/[-T:Z\.]/g, '').substr(0, 14);

        let create_user = req.session.user_id;

        let newOrderData = {
            order_id,
            create_user,
            description,
            children_orders: null,
            create_time: now,
            update_time: now
        };

        // 创建子订单
        let createChildOrderQueue = child_orders.map((child_order, child_order_index) => cb => {
            let child = _.cloneDeepWith(child_order);
            let num = child.num;
            delete child_order.num;
            let newChildOrder = {
                order_id,
                child_order_id: order_id + '-' + (child_order_index + 1),
                create_user,
                status: 'pending',
                progress: [{ status: 'pending', time: now, user: create_user, description}],
                num,
                product: child_order
            };
            childOrderModel.create(newChildOrder, result => cb(null, result));
        });
        async.series(createChildOrderQueue, (err, childOrders) => {
            // 创建订单
            newOrderData.child_orders = childOrders.map(childOrder => childOrder._id);
            orderModel.create(newOrderData, order => {
                res.json(xres({ code: 0 }, order));

                // 创建产品
                let createProductQueue = child_orders.map((child_order, child_order_index) => cb => {
                    productModel.list({ where: { code: child_order.code } }, result => {
                        let newProductDatas = {
                            name: child_order.name,
                            code: child_order.code,
                            category: child_order.category_id,
                            unit_price: child_order.unit_price,
                            attrs: child_order.attrs
                        };

                        newProductDatas.hash = utils.hash(JSON.stringify(newProductDatas));

                        // 不存在：创建
                        if (!result.length) return productModel.create(newProductDatas, result => cb(null, result));

                        // 已存在
                        if (result[0].hash === newProductDatas.hash) return;

                        productModel.update(result[0]._id, newProductDatas, result => cb(null, result));
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